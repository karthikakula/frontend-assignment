import React from 'react';
import { Pegboard } from 'components/Pegboard';
import { Sidebar } from 'components/Sidebar';
import { Peg } from 'components/Peg';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classes from './game.scss';
import { SnapDragLayer } from 'components/SnapDragLayer';
import { scaleLinear } from 'd3-scale';


class Game extends React.Component {
  render() {
    const yTicks = 10;
    const xTicks = 19;
    const growthFactor = 50;

    const ySize = growthFactor * yTicks;
    const xSize = growthFactor * xTicks;

    console.log(ySize);
    console.log(xSize);

    const yScale= scaleLinear()
      .domain([yTicks, 0])
      .range([0, ySize]);

    const xScale = scaleLinear()
      .domain([0, xTicks])
      .range([0, xSize]);

    return (<div className={ classes.gameContainer }>
      <SnapDragLayer />
      <Sidebar className={ classes.sideBar }>
        <Peg />
        <Peg />
        <Peg />
        <Peg />
      </Sidebar>
      <Pegboard
        margins={
           { top: 20, left: 50, right: 20, bottom: 20 }
        }
        className={ classes.contentArea }
        xScale={ xScale }
        yScale={ yScale }
        xTicks={ xTicks }
        yTicks={ yTicks }
      />
    </div>);
  }

}

export default DragDropContext(HTML5Backend)(Game);
