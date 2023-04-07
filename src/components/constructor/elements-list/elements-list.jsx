import React from 'react'
import PropTypes from 'prop-types'
import { BurgerElement, BurgerElementType } from '../burger-element/burger-element'
import styles from './styles.module.css'

const ElementsList = ({ items }) => {
  return (
    <div className={`custom-scroll ${styles.container}`}>
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
