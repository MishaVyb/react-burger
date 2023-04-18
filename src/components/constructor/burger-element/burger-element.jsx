import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'

import { addConstructorItem } from '../../../services/constructor/actions'
import BurgerIngredientType from '../../../utils/types'
import BlankConstructorElement from '../blank-constructor-element.jsx/blank-constructor-element'
import styles from './styles.module.css'

const BurgerElement = ({ item, index, arrangement }) => {
  const dispatch = useDispatch()
  const [{ isHover }, dropTarget] = useDrop({
    accept: arrangement ? 'bun' : 'ingredient',
    drop(item) {
      dispatch(addConstructorItem(item, index))
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  })
  const extraClass = arrangement ? `ml-8 ${styles.item}` : `ml-2 ${styles.item}`

  return (
    <div className={`mt-2 mb-2 ${styles.container}`} ref={dropTarget}>
      {arrangement ? null : <DragIcon type='primary' />}
      {item ? (
        <ConstructorElement
          type={arrangement}
          isLocked={arrangement}
          text={item.name + (arrangement ? (arrangement === 'top' ? ' (верх)' : ' (низ)') : '')}
          price={item.price}
          thumbnail={item.image_mobile}
          extraClass={extraClass}
        />
      ) : (
        <BlankConstructorElement arrangement={arrangement} extraClass={extraClass} />
      )}
    </div>
  )
}

BurgerElement.propTypes = {
  item: BurgerIngredientType.isRequired,
  index: PropTypes.number,
  arrangement: PropTypes.oneOf(['top', 'bottom']).isRequired,
}

BurgerElement.defaultProps = {
  index: 0,
}

export default BurgerElement
