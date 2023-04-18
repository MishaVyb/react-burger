import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'

import { addConstructorItem, removeConstructorItem, setHoveredItemIndex } from '../../../services/constructor/actions'
import { selectConstructorItems } from '../../../services/constructor/selectors'
import { BurgerIngredientType, DragTypes } from '../../../utils/types'
import BlankConstructorElement from '../blank-constructor-element.jsx/blank-constructor-element'
import { sortableHoverHandler } from './sortable-hover-handler'
import styles from './styles.module.css'

const BurgerElement = ({ item, index, arrangement }) => {
  const isBlank = !item
  const ref = useRef(null)
  const dispatch = useDispatch()
  const items = useSelector(selectConstructorItems)
  const [{ isOver, canDrop }, dropTarget] = useDrop({
    accept: DragTypes.forArrangement(arrangement),
    drop(item) {
      dispatch(addConstructorItem(item, index))
    },
    hover(item) {}, // UNUSED
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  useEffect(() => {
    if (isOver) {
      dispatch(setHoveredItemIndex(index))
      return () => {
        dispatch(setHoveredItemIndex(null))
      }
    }
  }, [isOver, dispatch, index])

  let extraClass = styles.item
  extraClass += arrangement ? ' ml-8' : ' ml-2'
  extraClass += canDrop ? ` ${styles.drop_target}` : ''

  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  const [{ handlerId }, drop] = useDrop({
    accept: DragTypes.FILLINGS_CO,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item, monitor) => sortableHoverHandler(ref, dispatch, index, items.length, item, monitor),
  })
  const [{ isDragging }, drag] = useDrag({
    type: DragTypes.FILLINGS_CO,
    item: () => ({ id: item._id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  const dragStyle = isDragging ? { border: '2px solid red', opacity } : {}

  drag(drop(dropTarget(ref)))
  ////////////////////////////

  return (
    <div className={`pt-2 pb-2 ${styles.container}`} ref={ref} style={dragStyle} data-handler-id={handlerId}>
      {arrangement ? null : <DragIcon type='primary' />}
      {isBlank ? (
        <BlankConstructorElement arrangement={arrangement} extraClass={extraClass} />
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
