import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'

import { addConstructorItem, moveConstructorItem, setHoveredItemIndex } from '../../../services/constructor/actions'
import { selectConstructorItems } from '../../../services/constructor/selectors'
import { BurgerIngredientType, DragTypes } from '../../../utils/types'
import BlankConstructorElement from '../blank-constructor-element.jsx/blank-constructor-element'
import styles from './styles.module.css'

const BurgerElement = ({ item, index, arrangement }) => {
  const isBlank = !item
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
  const itemGlob = item
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: DragTypes.FILLINGS_CO,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards:
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards:
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Dragging downwards when item is the last already:
      if (hoverIndex === 0 && dragIndex === items.length - 1) {
        return
      }

      // Time to actually perform the action
      dispatch(moveConstructorItem(dragIndex, hoverIndex))

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
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
          handleClose={() => {
            console.log('close')
          }}
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
