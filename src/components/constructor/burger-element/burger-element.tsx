import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import type { Identifier } from 'dnd-core'
import { FC, useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'

import { addConstructorItem, removeConstructorItem, setMovingItemIndex } from '../../../services/constructor/actions'
import { selectConstructorItems, selectConstructorMovingItemIndex } from '../../../services/constructor/selectors'
import {
  DragGroups,
  IDragFullItem,
  IDragItem,
  TArrangement,
  TBurgerIngredient,
  getDragGroup,
  isFilling,
} from '../../../utils/types'
import BlankConstructorElement from '../blank-constructor-element/blank-constructor-element'
import { sortableHoverHandler } from './sortable-hover-handler'
import styles from './styles.module.css'

interface IBurgerElementProps {
  item?: TBurgerIngredient
  index?: number
  arrangement?: TArrangement
  setContainerHighlight?: (isHighlight: boolean) => void
}

const BurgerElement: FC<IBurgerElementProps> = ({ item, index, arrangement, setContainerHighlight }) => {
  const ref = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const movingIndex: number | null = useSelector(selectConstructorMovingItemIndex)
  const items: TBurgerIngredient[] = useSelector(selectConstructorItems)
  const [isItemHighlight, setItemHighlight] = useState(false)

  const isBlank = !item
  const isEmptyBlank = !arrangement && movingIndex === index

  // [1] useDrop for ingredients from left bar:
  const [{ canDrop, isOver }, dropTarget] = useDrop<IDragFullItem, void, { canDrop: boolean; isOver: boolean }>({
    accept: getDragGroup(arrangement),
    hover: (dragItem, monitor) => {
      // [1.1]
      // Buns do not have index and movingItemIndex accordingly. And Buns are not sortable.
      // So here is an extra case handling:
      if (dragItem.type === 'bun') {
        if (!dragItem.isBunApplied) {
          dragItem.isBunApplied = true
          dispatch(addConstructorItem(dragItem, undefined))
        }
        return
      }

      // [1.2]
      // For the first hover call item is not in a target array and index is undefined.
      // So add Burger Constructor Item at this moment.
      if (dragItem.index === undefined) {
        dispatch(addConstructorItem(dragItem, index))

        // Also item may be dragged inside container (it's sortable).
        // For better performance, we want to show Empty Blank Item (dashed border container) under current drag layer.
        // So setMovingItemIndex is called here:
        dispatch(setMovingItemIndex(index))
        dragItem.index = index // NOTE: the same item index mutating as in `sortableHoverHandler(..)`
      } else {
        // [1.3]
        // Item already in the target array and we just supporting he same sorting, as below.
        sortableHoverHandler(ref, dispatch, index, items.length, dragItem, monitor)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  // [2] useDrag & useDrop for internal items sorting:
  const [, drag] = useDrag<IDragItem, void, void>({
    type: DragGroups.FILLINGS_CONSTRUCTOR,

    // NOTE:
    // Casting index as number here because, DragGroup FILLINGS_CONSTRUCTOR is only for Fillings,
    // therefore it is always has index (as it is array item).
    item: () => ({ index: index as number }),
    canDrag: () => isFilling(item),
    end: () => dispatch(setMovingItemIndex(null)),
  })
  const [{ handlerId }, drop] = useDrop<IDragItem, void, { handlerId: Identifier | null }>({
    accept: DragGroups.FILLINGS_CONSTRUCTOR,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (dragItem, monitor) => {
      sortableHoverHandler(ref, dispatch, index, items.length, dragItem, monitor)
    },
    drop: () => {
      dispatch(setMovingItemIndex(null))
    },
  })

  // [3] Combine all refs toogether:
  drag(drop(dropTarget(ref)))

  // [4] Stylization:
  let extraClass = styles.item
  extraClass += arrangement ? ' ml-8' : ' ml-2'
  extraClass += isItemHighlight ? ` ${styles.highlight}` : ''

  useEffect(() => {
    if (setContainerHighlight) {
      setContainerHighlight(canDrop && !isOver)
    } else {
      setItemHighlight(canDrop)
    }
  }, [canDrop, isOver, setContainerHighlight])

  return (
    <div className={`pt-2 pb-2 ${styles.container}`} ref={ref} style={{}} data-handler-id={handlerId}>
      {arrangement ? null : (
        <div className={styles.drag_cursor}>
          <DragIcon type='primary' />
        </div>
      )}
      {isBlank || isEmptyBlank ? (
        <BlankConstructorElement arrangement={arrangement} extraClass={extraClass} empty={isEmptyBlank} />
      ) : (
        <ConstructorElement
          type={arrangement}
          isLocked={!!arrangement}
          text={item.name + (arrangement ? (arrangement === 'top' ? ' (верх)' : ' (низ)') : '')}
          price={item.price}
          thumbnail={item.image_mobile}
          extraClass={extraClass}
          handleClose={() => dispatch(removeConstructorItem(item, index))}
        />
      )}
    </div>
  )
}

BurgerElement.defaultProps = {
  index: 0, // NOTE: necessary default for the first dragged item
}

export default BurgerElement
