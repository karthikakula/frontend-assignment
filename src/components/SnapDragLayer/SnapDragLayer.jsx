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
    const {
      isDragging, currentOffset, item, xScale, yScale, xSize, ySize, margins,
      sidebarWidth, pinHeight, pinWidth
    } = this.props;

    if(currentOffset) {
      if( currentOffset.x <= ((sidebarWidth + margins.left) * 0.99) ||
          currentOffset.x >= ((sidebarWidth + xSize + margins.left) * 1.01) ||
          currentOffset.y <= ((margins.top) * 0.99) ||
          currentOffset.y >= ((ySize + margins.top) * 1.01) ) {
        return null;
      }

      const x = Math.round(xScale.invert(currentOffset.x - sidebarWidth - margins.left));
      const y = Math.round(yScale.invert(currentOffset.y - margins.top));

      const style = {
        position:'absolute',

        // 40 for pin height
        top: `${yScale(y) + margins.top - pinHeight}px`,

        // 14 for 1/2 pin width, 57 for sidebar width
        left: `${xScale(x) + margins.left - (pinWidth/2) + sidebarWidth}px`
      };

      return (<div style={ layerStyles }>
        <Peg width={ pinWidth } height={ pinHeight } placed={ true } peg={ item.peg } style={ style } />
      </div>);
    }

    return null;
  }
}

export default DragLayer(collect)(SnapDragLayer);
