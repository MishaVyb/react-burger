import React from 'react'
import PropTypes from 'prop-types'
import { BurgerIngredientType } from '../ingredient-card/ingredient-card'
import styles from './styles.module.css'

const INGREDIENT_UNITS_MAPPING = {
  calories: 'Калории, ккал',
  proteins: 'Белки, г',
  fat: 'Жири, г',
  carbohydrates: 'Углеводы, г',
}

const IngredientDetail = ({ item }) => {
  return (
    <div className={styles.container}>
      <p className={`text text_type_main-large ${styles.title}`}>Детали ингредиента</p>
      <img className='' src={item.image_large} alt='' />
      <p className={`text text_type_main-medium m-4 ${styles.aaa}`}>{item.name}</p>
      <section className={styles.ingredient_composition}>
        {Object.entries(INGREDIENT_UNITS_MAPPING).map(([k, v], i) => {
          return (
            <div className='m-3' key={k}>
              <p className={`text text_type_main-small text_color_inactive ${styles.aaa}`}>
                {v}
              </p>
              <p className={`text text_type_main-small text_color_inactive ${styles.aaa}`}>
                {item[k]}
              </p>
            </div>
          )
        })}
      </section>
    </div>
  )
}

IngredientDetail.propTypes = {
  item: BurgerIngredientType.isRequired,
}

export default IngredientDetail
