import React from 'react';
import { DragLayer } from 'react-dnd';
import { Peg } from '../Peg';

const collect = (monitor) => ({
  isDragging: monitor.isDragging(),
  currentOffset: monitor.getClientOffset()
});
const layerStyles = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};
class SnapDragLayer extends React.Component {
  render() {
    const { isDragging, currentOffset } = this.props;

    if(currentOffset) {
      const style = {
        position:'absolute',
        top: `${currentOffset.y - 50}px`,
        left: `${currentOffset.x - 18}px`
      };

      return (<div style={ layerStyles }>
        <Peg style={ style } />
      </div>);
    }

    return null;
  }
}

export default DragLayer(collect)(SnapDragLayer);
