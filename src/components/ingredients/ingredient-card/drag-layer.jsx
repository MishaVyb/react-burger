import { useDragLayer } from 'react-dnd'

import { DragTypes } from '../../../utils/types'
import IngredientCard from './ingredient-card'
import styles from './styles.module.css'

export const CustomDragLayer = () => {
  // Stylized drag layer. Add custom border to dragged layer.
  // Docs: https://react-dnd.github.io/react-dnd/docs/api/use-drag-layer
  //
  const { itemType, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
  }))
  if (!currentOffset) {
    return null
  }
  const translate = `translate(${currentOffset.x}px, ${currentOffset.y}px)`

  const getElementByType = () => {
    switch (itemType) {
      case DragTypes.BUN:
      case DragTypes.FILLINGS:
        return (
          <div className={styles.dragging}>
            <IngredientCard item={item} />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={styles.dragging_wrapper} style={{ transform: translate, WebkitTransform: translate }}>
      {getElementByType()}
    </div>
  )
}
