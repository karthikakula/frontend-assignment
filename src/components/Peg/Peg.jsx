import React, { PropTypes } from 'react';
import scss from './Peg.scss';
import { DragSource } from 'react-dnd';
import classnames from 'classnames';
import { getEmptyImage } from 'react-dnd-html5-backend';
import ImmutablePropTypes from 'react-immutable-proptypes';

export const PEG_TYPE = 'PEG';

const source = {
  beginDrag(props) {
    const { currentPos, peg, removePeg } = props;

    return {
      peg: props.peg,
      currentPos
    };
  },

  canDrag(props) {
    return !props.disabled
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
  canDrag: monitor.canDrag()
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
    const {
      connectDragSource, connectDragPreview, isDragging,
      placed, peg, currentPos, width, height, canDrag, ...props
    } = this.props;

    const finalClassName = classnames(
      scss.peg,
      isDragging && placed ? scss.dragging : null,
      currentPos || placed ? scss.dropped : null,
      canDrag ? null : scss.cantDrag
    )

    return (connectDragSource(
      <div className={ finalClassName } {...props }>
        <i className={ `fa fa-thumb-tack`} style={ { fontSize: height, width } }>
          <span className={ scss.pegId }>{ peg.get('id') }</span>
        </i>
        { placed ? null : (<div className='pegInfo'>{ `x:${peg.get('x')}, y:${peg.get('y')}` }</div>) }
      </div>
    ));
  }
}

Peg.propTypes = {
  placed: PropTypes.bool,
  currentPos: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  peg: ImmutablePropTypes.mapContains({
    id: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

export default DragSource(PEG_TYPE, source, collect)(Peg);
