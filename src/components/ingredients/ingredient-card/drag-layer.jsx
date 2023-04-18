import { useDragLayer } from 'react-dnd'

import IngredientCard from './ingredient-card'
import styles from './styles.module.css'

const layerStyles = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
}

export const CustomDragLayer = (props) => {
  const { itemType, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
  }))
  if (!currentOffset) {
    return null
  }

  const getElementByType = () => {
    switch (itemType) {
      case 'ingredient':
        return (
          <div className={styles.dragging}>
            <IngredientCard item={item} />
          </div>
        )
      default:
        return null
    }
  }

  let { x, y } = currentOffset
  return (
    <div style={layerStyles}>
      <div
        style={{
          transform: `translate(${x}px, ${y}px)`,
          WebkitTransform: `translate(${x}px, ${y}px)`,
        }}
      >
        {getElementByType()}
      </div>
    </div>
  )
}
