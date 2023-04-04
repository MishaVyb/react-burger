import React from 'react'
import PropTypes from 'prop-types'
import { BurgerElement, BurgerElementType } from './BurgerElement'
import styles from './styles.module.css'

// TODO rename: ConstructorList
const ElementsList = ({ items }) => {
  return (
    <div className={`custom-scroll ${styles.list}`}>
      {items.map((v) => (
        <BurgerElement key={v._id} item={v} />
      ))}
    </div>
  )
}

ElementsList.propTypes = {
  items: PropTypes.arrayOf(BurgerElementType),
}

export default ElementsList
