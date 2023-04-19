import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'

import {
  addConstructorItem,
  removeConstructorItem,
  setHoveredItemIndex,
  setMovingItemIndex,
} from '../../../services/constructor/actions'
import { selectConstructorItems, selectConstructorMovingItemIndex } from '../../../services/constructor/selectors'
import { BurgerIngredientType, DragTypes } from '../../../utils/types'
import BlankConstructorElement from '../blank-constructor-element.jsx/blank-constructor-element'
import { sortableHoverHandler } from './sortable-hover-handler'
import styles from './styles.module.css'

const BurgerElement = ({ item, index, arrangement }) => {
  const ref = useRef(null)
  const dispatch = useDispatch()
  const movingIndex = useSelector(selectConstructorMovingItemIndex)
  const items = useSelector(selectConstructorItems)

  const isBlank = !item
  const isEmptyBlank = !arrangement && movingIndex === index

  // [1] useDrop for ingredients from left bar:
  const [{ isOver, canDrop }, dropTarget] = useDrop({
    accept: DragTypes.forArrangement(arrangement),
    drop(item) {
      dispatch(addConstructorItem(item, index))
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  // [1.1] Set hover index. It allow to render Blank Element after current while is's hovered.
  useEffect(() => {
    if (isOver) {
      dispatch(setHoveredItemIndex(index))
      return () => {
        dispatch(setHoveredItemIndex(null))
      }
    }
  }, [isOver, dispatch, index])

  // [2] useDrag & useDrop for internal items sorting:
  const [, drag] = useDrag({
    type: DragTypes.FILLINGS_CONSTRUCTOR,
    item: () => ({ index }),
  })
  const [{ handlerId }, drop] = useDrop({
    accept: DragTypes.FILLINGS_CONSTRUCTOR,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item, monitor) => {
      sortableHoverHandler(ref, dispatch, index, items.length, item, monitor)
    },
    drop: () => dispatch(setMovingItemIndex(null)),
  })

  // [3] Combine all refs toogether:
  drag(drop(dropTarget(ref)))

  // [4] Styles:
  let extraClass = styles.item
  extraClass += arrangement ? ' ml-8' : ' ml-2'
  extraClass += canDrop ? ` ${styles.drop_target}` : ''

  return (
    <div className={`pt-2 pb-2 ${styles.container}`} ref={ref} style={{}} data-handler-id={handlerId}>
      {arrangement ? null : <DragIcon type='primary' />}
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
}

BurgerElement.defaultProps = {
  index: 0,
}

export default BurgerElement
