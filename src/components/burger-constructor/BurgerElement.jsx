import React from 'react'
import PropTypes from 'prop-types'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'

// TODO rename: ConstructorElement
const BurgerElement = ({ item, arrangement }) => {
  return (
    <div className={`mt-2 mb-2 ${styles.element}`}>
      {arrangement ? <></> : <DragIcon type='primary' />}
      <div className={arrangement ? 'ml-8' : 'ml-2'}>
        <ConstructorElement
          type={arrangement}
          isLocked={arrangement}
          text={item.name}
          price={item.price}
          thumbnail={item.image_mobile}
        />
      </div>
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
