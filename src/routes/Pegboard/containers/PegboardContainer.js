import React from 'react';
import { Pegboard } from 'components/Pegboard';
import { Sidebar } from 'components/Sidebar';
import { Peg } from 'components/Peg';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classes from './game.scss';
import { SnapDragLayer } from 'components/SnapDragLayer';
import { scaleLinear } from 'd3-scale';
import { connect } from 'react-redux';
import { actions } from '../modules/pegboard';
import { is } from 'immutable';

const PEGS = [
  { id: '1', x: '5', y: '4' },
  { id: '2', x: '2', y: '3' },
  { id: '3', x: '1', y: '9' },
  { id: '4', x: '9', y: '2' }
]

class PegboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onCheck = this.onCheck.bind(this);
    this.onReset = this.onReset.bind(this);
    this.getPegsLeft = this.getPegsLeft.bind(this);
  }

  onReset() {
    const { initBoard } = this.props;
    initBoard({ height: 10, width: 15 })
  }

  onCheck() {
    const { pegboard } = this.props;

    if(this.getPegsLeft().length > 0) {
      return alert('you still have pegs left to place')
    }

    let badPeg = false;
    let msg = '';
    PEGS.forEach(peg => {

      if(pegboard.getIn([peg.y, peg.x]).id !== peg.id) {
        msg += `peg ${peg.id} should be at x: ${peg.x}, y: ${peg.y}\n`;
        badPeg = true;
      }
    })

    if(!badPeg) {
      alert('You did it!');
    } else {
      alert(msg);
    }
  }

  getPegsLeft() {
    const { pegboard } = this.props;

    return PEGS
      .filter((peg) => !pegboard.find(pegs => pegs.find(peghole => is(peghole, peg))));
  }

  render() {
    const { placePeg, pegboard, initBoard, removePeg } = this.props;

    if(!pegboard || pegboard.size === 0) {
      this.onReset();
      return null;
    }

    const yTicks = pegboard.size - 1;
    const xTicks = pegboard.first().size - 1;
    const growthFactor = 50;

    const ySize = growthFactor * yTicks;
    const xSize = growthFactor * xTicks;

    const yScale= scaleLinear()
      .domain([yTicks, 0])
      .range([0, ySize]);

    const xScale = scaleLinear()
      .domain([0, xTicks])
      .range([0, xSize]);

    return (<div className={ classes.gameContainer }>
      <Sidebar className={ classes.sideBar }>
        {
          this.getPegsLeft()
            .map((peg) => <Peg onPegGrab={ removePeg } peg={ peg } key={ peg.id } />)
        }
      </Sidebar>
      <Pegboard
        margins={
           { top: 20, left: 50, right: 20, bottom: 20 }
        }
        onPegDrop={ placePeg }
        onPegGrab={ removePeg }
        className={ classes.contentArea }
        pegboard={ pegboard }
        xScale={ xScale }
        yScale={ yScale }
        xTicks={ xTicks }
        yTicks={ yTicks }
      />
    <div>
    <button onClick={ this.onCheck }>Check Results</button>
    <button onClick={ this.onReset }>Reset</button>
    </div>
    </div>);
  }

}

const mapStateToProps = (state, props) => ({
  pegboard: state.pegboard
});

const mapDispatchToProps = {
  placePeg: actions.placePeg,
  removePeg: actions.removePeg,
  initBoard: actions.initBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(PegboardContainer));
