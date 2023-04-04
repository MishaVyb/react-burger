import React from 'react'
import PropTypes from 'prop-types'
import { IngredientCard, BurgerIngredientType } from './IngredientCard'
import styles from './styles.module.css'

const IngredientsList = ({ items, title }) => {
  return (
    <div className='mt-5 mb-5'>
      <p className='text text_type_main-medium'>{title}</p>
      <div className={`mt-2 mb-2 ${styles.list}`}>
        {items.map((v, i) => (
          <div key={v._id} className={styles.list_inner}>
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
