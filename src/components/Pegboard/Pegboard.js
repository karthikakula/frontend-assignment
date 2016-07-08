import React from 'react';
import scss from './Pegboard.scss';
import classnames from 'classnames';
import Axis from '../Axis';
import { scaleLinear } from 'd3-scale';
import { Range } from 'immutable';
import { DropTarget } from 'react-dnd';
import { PEG_TYPE } from '../Peg';
import { findDOMNode } from 'react-dom';

console.log(PEG_TYPE);

const target = {
  drop: (props) => {
    console.log('is dropped');
  },

  hover: (props, monitor, component) => {
    const offset = monitor.getClientOffset();
    const boundingRect = findDOMNode(component).getBoundingClientRect();

    console.log(props);

    // get the relative x and y positions
    // offset is the ABSOLUTE dragging positions
    // boundingRect is the ABSOLUTE position of the
    // element being hovered (top-left being 0,0)
    // also, remeber to remove the margins
    const x = offset.x - boundingRect.left - props.margins.left;
    const y = offset.y - boundingRect.top - props.margins.top;

    console.log(`${x},${y}`)
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
});

class Pegboard extends React.Component {
  render() {
    const { connectDropTarget, className, xTicks, yTicks, growthFactor, isOver, margins, ...props } = this.props;

    const finalClassName = classnames(
      className, scss.pegBoard
    );

    const xSize = growthFactor * xTicks;
    const ySize = growthFactor * yTicks;

    const xScale = scaleLinear()
      .domain([0, xTicks])
      .range([0, xSize]);

    const yScale = scaleLinear()
      .domain([yTicks, 0])
      .range([0, ySize]);

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
