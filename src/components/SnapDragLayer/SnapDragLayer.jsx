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

      if(currentOffset.x <= 83 || currentOffset.x >= 560 || currentOffset.y <= 33 || currentOffset.y >= 625) {
        return null;
      }
      console.log('------ ON DRAG LAYER --------');
      console.log(`os-y: ${currentOffset.y}, mn-y: ${0}, mg-t: ${margins.top}`);

      const x = Math.round(xScale.invert(currentOffset.x - 57 - margins.left));
      const y = Math.round(yScale.invert(currentOffset.y - 0 - margins.top));

      console.log(`x: ${x}, y: ${y}`);

      const style = {
        position:'absolute',
        top: `${yScale(y)}px`,
        left: `${xScale(x)}px`
      };

      return (<div style={ layerStyles }>
        <Peg placed={ true } peg={ item.peg } style={ style } />
      </div>);
    }

    return null;
  }
}

export default DragLayer(collect)(SnapDragLayer);
