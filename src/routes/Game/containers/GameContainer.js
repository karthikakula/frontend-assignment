import React from 'react';
import { Pegboard } from 'components/Pegboard';
import { Sidebar } from 'components/Sidebar';
import classes from './game.scss';

console.log(classes);

class Game extends React.Component {

  render() {
    return (<div className={ classes.gameContainer }>
      <Sidebar className={ classes.sideBar }>

      </Sidebar>
      <Pegboard className={ classes.contentArea }>

      </Pegboard>
    </div>);
  }

}

export default Game;
