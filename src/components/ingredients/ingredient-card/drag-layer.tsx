import { Identifier } from 'dnd-core/dist/interfaces'
import { FC } from 'react'
import { XYCoord, useDragLayer } from 'react-dnd'

import { DragGroups, TBurgerIngredient } from '../../../utils/types'
import IngredientCard from './ingredient-card'
import styles from './styles.module.css'

interface IDragLayerCollectedProps {
  item: TBurgerIngredient
  itemType: Identifier | null
  currentOffset: XYCoord | null
}

export const CustomDragLayer: FC = () => {
  // Stylized drag layer. Add custom border to dragged layer.
  // Docs: https://react-dnd.github.io/react-dnd/docs/api/use-drag-layer
  //
  const { item, itemType, currentOffset } = useDragLayer<IDragLayerCollectedProps, TBurgerIngredient>((monitor) => ({
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
      case DragGroups.BUN:
      case DragGroups.FILLINGS:
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
