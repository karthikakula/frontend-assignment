import React from 'react';
import scss from './Pegboard.scss';
import classnames from 'classnames';
import Axis from '../Axis';
import { Range } from 'immutable';
import { DropTarget } from 'react-dnd';
import { PEG_TYPE } from '../Peg';
import { findDOMNode } from 'react-dom';
import { Peg } from '../Peg';
import { scaleLinear } from 'd3-scale';

const target = {
  drop: (props, monitor, component) => {
    const { xScale, yScale } = props;

    const offset = monitor.getClientOffset();
    const targetRect = findDOMNode(component).getBoundingClientRect();

    const x = Math.round(xScale.invert(offset.x - targetRect.left - props.margins.left));
    const y = Math.round(yScale.invert(offset.y - targetRect.top - props.margins.top));

    const peg = monitor.getItem().peg;

    if(peg.currentPos) {
      props.onPegGrab(peg.currentPos)
    }

    props.onPegDrop({ x, y, peg });
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
});

class Pegboard extends React.Component {

  pegColor(x, y) {
    const { pegboard, isOver } = this.props;

    if(pegboard.getIn([x, y])) {
      return 'green';
    }

    return isOver ? 'red' : 'grey';
  }

  pegRadius(x, y) {
    const { pegboard, isOver } = this.props;

    return isOver || pegboard.getIn([x, y]) ? '5' : '3';
  }

  render() {
    const {
      connectDropTarget, className, isOver, margins,
      pegboard, onPegGrab, xScale, yScale, xSize, ySize,
      xTicks, yTicks, pinHeight, pinWidth, ...props
    } = this.props;

    const finalClassName = classnames(
      className, scss.pegBoard
    );

    return connectDropTarget(<div style={ { position: 'relative' } }>
      {
        Range(0, xTicks + 1).map(xNum => (
          Range(0, yTicks + 1).map(yNum => (
            pegboard.getIn([xNum, yNum]) ?
              (<Peg
                height={ pinHeight }
                width={ pinWidth }
                onPegGrab={ onPegGrab }
                peg={ pegboard.getIn([xNum, yNum]) }
                placed={ true }
                currentPos={ { x: xNum, y: yNum } }
                style={ {
                position: 'absolute',
                // 40 = pin height
                top: `${yScale(yNum) + margins.top - pinHeight}px`,
                // 14 = 1/2 pin width; we DONT need to account for side bar width
                // here since our div is only over the SVG
                left: `${xScale(xNum) + margins.left - (pinWidth / 2)}px`
              }
              } />) :
              null
          ))
        ))
      }
        <svg width={ xSize + margins.left + margins.right }
          height={ ySize + margins.top + margins.bottom }
          className={ finalClassName } >
          <g transform={ `translate(${margins.left}, ${margins.top})`}>
            {
              // immutable ranges are inclusive at the start
              // exclusive at the end
              Range(0, xTicks + 1).map(xNum => (
                Range(0, yTicks + 1).map(yNum => (
                  !pegboard.getIn([xNum, yNum]) ?
                    <circle
                      opacity="1"
                      r={ this.pegRadius(xNum, yNum) }
                      cx={ xScale(xNum) }
                      cy={ yScale(yNum) }
                      fill={ this.pegColor(xNum, yNum) }
                      /> : null
                ))
              ))
            }
          <Axis
            orientation="bottom"
            scale={ xScale }
            transform={ `translate(0, ${ySize})` }
            tickSizeInner={ ySize }
            ticks={ xTicks }
          />
          <Axis
            orientation="left"
            scale={ yScale }
            transform={ `translate(0, 0)` }
            tickSizeInner={ xSize }
            ticks={ yTicks }
          />
        </g>
      </svg>
    </div>
    );
  }
}

export default DropTarget(PEG_TYPE, target, collect)(Pegboard);
