import React from 'react';
import { DragLayer } from 'react-dnd';
import { Peg } from '../Peg';

const collect = (monitor) => ({
  isDragging: monitor.isDragging(),
  currentOffset: monitor.getClientOffset(),
  item: monitor.getItem()
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
    const { isDragging, currentOffset, item, xScale, yScale, margins } = this.props;

    if(currentOffset) {

      console.log(currentOffset.y);

      if(currentOffset.x <= 105 || currentOffset.x >= 560 || currentOffset.y <= 33 || currentOffset.y >= 586) {
        return null;
      }

      const x = xScale(Math.round(xScale.invert(currentOffset.x - 57 - margins.left))) + 83;
      const y = yScale(Math.round(yScale.invert(currentOffset.y - 0 - margins.top))) - 2;

      const style = {
        position:'absolute',
        top: `${y}px`,
        left: `${x}px`
      };

      return (<div style={ layerStyles }>
        <Peg placed={ true } peg={ item.peg } style={ style } />
      </div>);
    }

    return null;
  }
}

export default DragLayer(collect)(SnapDragLayer);
