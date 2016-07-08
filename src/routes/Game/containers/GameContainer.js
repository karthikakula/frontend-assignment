import React from 'react';
import { Pegboard } from 'components/Pegboard';
import { Sidebar } from 'components/Sidebar';
import { Peg } from 'components/Peg';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classes from './game.scss';

class Game extends React.Component {

  render() {
    return (<div className={ classes.gameContainer }>
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
        xTicks={ 19 }
        yTicks={ 10 }
        growthFactor={ 50 }
      />
    </div>);
  }

}

export default DragDropContext(HTML5Backend)(Game);
