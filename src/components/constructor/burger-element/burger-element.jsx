import React from 'react'
import PropTypes from 'prop-types'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'
import BurgerIngredientType from '../../../utils/types'

const BurgerElement = ({ item, arrangement }) => {
  return (
    <div className={`mt-2 mb-2 ${styles.container}`}>
      {arrangement ? null : <DragIcon type='primary' />}
      <ConstructorElement
        type={arrangement}
        isLocked={arrangement}
        text={item.name + (arrangement ? (arrangement === 'top' ? ' (верх)' : ' (низ)') : '')}
        price={item.price}
        thumbnail={item.image_mobile}
        extraClass={arrangement ? `ml-8 ${styles.item}` : `ml-2 ${styles.item}`}
      />
    </div>
  )
}

BurgerElement.propTypes = {
  item: BurgerIngredientType.isRequired,
  arrangement: PropTypes.oneOf(['top', 'bottom']),
}

export default BurgerElement
