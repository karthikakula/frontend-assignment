import React from 'react';
import scss from './Peg.scss';
import { DragSource } from 'react-dnd';
import classnames from 'classnames';
import pegImg from './assets/Biar99bi8.png';

export const PEG_TYPE = 'PEG';

const Peg = ({ connectDragSource, isDragging }) => {

  console.log(scss);

  const finalClassName = classnames(
    scss.peg,
    isDragging ? scss.dragging : null
  )

  return connectDragSource(<span className={ finalClassName }>†</span>);
};

const source = {
  beginDrag(props) {
    return {};
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

export default DragSource(PEG_TYPE, source, collect)(Peg);
