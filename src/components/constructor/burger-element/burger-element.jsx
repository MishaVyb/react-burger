import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'

import { addConstructorItem, setHoveredItemIndex } from '../../../services/constructor/actions'
import { BurgerIngredientType, DragTypes } from '../../../utils/types'
import BlankConstructorElement from '../blank-constructor-element.jsx/blank-constructor-element'
import styles from './styles.module.css'

const BurgerElement = ({ item, index, arrangement }) => {
  const isBlank = !item
  const dispatch = useDispatch()
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

  return (
    <div className={`pt-2 pb-2 ${styles.container}`} ref={dropTarget}>
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
