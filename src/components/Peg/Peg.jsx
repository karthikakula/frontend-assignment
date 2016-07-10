import React from 'react';
import scss from './Peg.scss';
import { DragSource } from 'react-dnd';
import classnames from 'classnames';
import { getEmptyImage } from 'react-dnd-html5-backend';

export const PEG_TYPE = 'PEG';

const source = {
  beginDrag(props) {
    const { currentPos, peg, removePeg } = props;

    return {
      peg: props.peg,
      currentPos
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
    const { connectDragSource, placed, isDragging, connectDragPreview, onPegGrab, peg, currentPos, width, height, ...props } = this.props;

    const finalClassName = classnames(
      scss.peg,
      isDragging && placed ? scss.dragging : null,
      currentPos || placed ? scss.dropped : null
    )

    return (connectDragSource(
      <div className={ finalClassName } {...props }>
        <i className={ `fa fa-thumb-tack ${scss.pegIcon}`} style={ { fontSize: height, width } }>
            <span className={ scss.pegId }>{ peg.get('id') }</span>
        </i>
        { placed ? null : (<div className={ scss.pegInfo } >x:{ peg.get('x') }, y:{peg.get('y') } </div>) }
      </div>
    ));
  }
}

export default DragSource(PEG_TYPE, source, collect)(Peg);
