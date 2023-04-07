import React from 'react'
import PropTypes from 'prop-types'
import { IngredientCard, BurgerIngredientType } from '../ingredient-card/ingredient-card'
import styles from './styles.module.css'

const IngredientsList = ({ items, title }) => {
  return (
    <div className='mt-5 mb-5'>
      <p className='text text_type_main-medium'>{title}</p>
      <div className={`mt-2 mb-2 ${styles.container}`}>
        {items.map((v, i) => (
          <div key={v._id} className={styles.item}>
            <IngredientCard item={v} count={i} />
          </div>
        ))}
      </div>
    </div>
  )
}

IngredientsList.propTypes = {
  items: PropTypes.arrayOf(BurgerIngredientType).isRequired,
  title: PropTypes.string,
}

export default IngredientsList
