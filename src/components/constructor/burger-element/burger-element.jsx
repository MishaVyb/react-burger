import React from 'react'
import PropTypes from 'prop-types'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'

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

const BurgerElementType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image_mobile: PropTypes.string.isRequired,
})

BurgerElement.propTypes = {
  item: BurgerElementType.isRequired,
  arrangement: PropTypes.oneOf(['top', 'bottom']),
}

export { BurgerElement, BurgerElementType }
