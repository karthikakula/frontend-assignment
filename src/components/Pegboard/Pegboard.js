import React from 'react';
import scss from './Pegboard.scss';
import classnames from 'classnames';
import Axis from '../Axis';
import { Range } from 'immutable';
import { DropTarget } from 'react-dnd';
import { PEG_TYPE } from '../Peg';
import { findDOMNode } from 'react-dom';

/*
hover: (props, monitor, component) => {

}
*/

const target = {
  drop: (props, monitor, component) => {
    const { xScale, yScale } = props;

    const offset = monitor.getClientOffset();
    const targetRect = findDOMNode(component).getBoundingClientRect();

    const x = Math.round(xScale.invert(offset.x - targetRect.left - props.margins.left));
    const y = Math.round(yScale.invert(offset.y - targetRect.top - props.margins.top));

    console.log(`do drop on x:${x}, y:${y}`)
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
});

class Pegboard extends React.Component {

  render() {
    const {
      connectDropTarget, className, xScale, yScale, isOver, margins,
      xTicks, yTicks, ...props
    } = this.props;

    const finalClassName = classnames(
      className, scss.pegBoard
    );

    const xSize = xScale.range()[1];
    const ySize = yScale.range()[1];

    return (connectDropTarget(<svg
      width={ xSize + margins.left + margins.right }
      height={ ySize + margins.top + margins.bottom }
      className={ finalClassName }
    >
      <g transform={ `translate(${margins.left},${margins.right})`}>
      {
        // immutable ranges are inclusive at the start
        // exclusive at the end
        Range(0, xTicks + 1).map(xNum => (
          Range(0, yTicks + 1).map(yNum => (
            <circle
              r={ isOver ? "5" : "3" }
              cx={ xScale(xNum) }
              cy={ yScale(yNum) }
              fill={ isOver ? "red" : "grey" }
            />
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
  </svg>));
  }
}

export default DropTarget(PEG_TYPE, target, collect)(Pegboard);
