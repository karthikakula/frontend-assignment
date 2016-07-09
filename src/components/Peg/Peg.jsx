import React from 'react';
import scss from './Peg.scss';
import { DragSource } from 'react-dnd';
import classnames from 'classnames';
import { getEmptyImage } from 'react-dnd-html5-backend';

export const PEG_TYPE = 'PEG';

const source = {
  beginDrag(props) {
    return {};
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
    const { connectDragSource, isDragging, connectDragPreview, ...props } = this.props;

    const finalClassName = classnames(
      scss.peg,
      isDragging ? scss.dragging : null
    )

    return connectDragSource(<span { ...props } className={ finalClassName }>†</span>);
  }
}

export default DragSource(PEG_TYPE, source, collect)(Peg);
