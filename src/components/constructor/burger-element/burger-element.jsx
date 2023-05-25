import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'

import { addConstructorItem, removeConstructorItem, setMovingItemIndex } from '../../../services/constructor/actions'
import { selectConstructorItems, selectConstructorMovingItemIndex } from '../../../services/constructor/selectors'
import { BurgerIngredientType, DragTypes, IngredientTypes } from '../../../utils/types'
import BlankConstructorElement from '../blank-constructor-element/blank-constructor-element'
import { sortableHoverHandler } from './sortable-hover-handler'
import styles from './styles.module.css'

const BurgerElement = ({ item, index, arrangement, setContainerHighlight }) => {
  const ref = useRef(null)
  const dispatch = useDispatch()
  const movingIndex = useSelector(selectConstructorMovingItemIndex)
  const items = useSelector(selectConstructorItems)
  const [isItemHighlight, setItemHighlight] = useState(false)

  const isBlank = !item
  const isEmptyBlank = !arrangement && movingIndex === index

  // [1] useDrop for ingredients from left bar:
  const [{ canDrop, isOver }, dropTarget] = useDrop({
    accept: DragTypes.forArrangement(arrangement),
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
  const [, drag] = useDrag({
    type: DragTypes.FILLINGS_CONSTRUCTOR,
    item: () => ({ index }),
    canDrag: () => item?.type === IngredientTypes.SAUCE || item?.type === IngredientTypes.MAIN,
  })
  const [{ handlerId }, drop] = useDrop({
    accept: DragTypes.FILLINGS_CONSTRUCTOR,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (dragItem, monitor) => {
      sortableHoverHandler(ref, dispatch, index, items.length, dragItem, monitor)
    },
    drop: () => dispatch(setMovingItemIndex(null)),
  })

  // [3] Combine all refs toogether:
  drag(drop(dropTarget(ref)))

  // [4] Stylization:
  let extraClass = styles.item
  extraClass += arrangement ? ' ml-8' : ' ml-2'
  extraClass += isItemHighlight ? ` ${styles.highlight}` : ''

  useEffect(() => {
    if (typeof setContainerHighlight === 'function') {
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
          isLocked={arrangement}
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

BurgerElement.propTypes = {
  item: BurgerIngredientType,
  index: PropTypes.number,
  arrangement: PropTypes.oneOf(['top', 'bottom']),
  setContainerHighlight: PropTypes.func,
}

BurgerElement.defaultProps = {
  index: 0, // NOTE: necessary default for the first dragged item
}

export default BurgerElement
