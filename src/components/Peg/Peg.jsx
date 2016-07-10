import React from 'react';
import scss from './Peg.scss';
import { DragSource } from 'react-dnd';
import classnames from 'classnames';
import { getEmptyImage } from 'react-dnd-html5-backend';
import imgSrc from './assets/Biar99bi8.png';

export const PEG_TYPE = 'PEG';

const source = {
  beginDrag(props) {
    const { currentPos, peg, removePeg } = props;

    peg.currentPos = currentPos;

    return {
      peg: props.peg
    };
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
});


class Peg extends React.Component {
  componentDidMount() {
    const { connectDragPreview } = this.props;

    connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true
    });
  }

  render() {
    const { connectDragSource, placed, isDragging, connectDragPreview, onPegGrab, peg, currentPos, ...props } = this.props;

    const finalClassName = classnames(
      scss.peg,
      isDragging ? scss.dragging : null,
      currentPos ? scss.dropped : null
    )

    return (connectDragSource(
      <div className={ finalClassName } {...props }>
        <span className={ scss.pegId }>{ peg.get('id') }</span>
        <img className={ scss.pegImg } src={ imgSrc } />
        { !placed ? (<div className={ scss.pegInfo } >x:{ peg.get('x') }, y:{peg.get('y') } </div>) : null }
      </div>
    ));
  }
}

export default DragSource(PEG_TYPE, source, collect)(Peg);
