import { useSelector } from 'react-redux'

import { selectIngredientDetail } from '../../../services/ingredientDetail/selectors'
import { BurgerIngredientType } from '../../../utils/types'
import styles from './styles.module.css'

const INGREDIENT_UNITS_MAPPING = {
  calories: 'Калории, ккал',
  proteins: 'Белки, г',
  fat: 'Жиры, г',
  carbohydrates: 'Углеводы, г',
}

const IngredientDetail = () => {
  const item = useSelector(selectIngredientDetail)
  return (
    <div className={styles.container}>
      <p className={`text text_type_main-large ${styles.title}`}>Детали ингредиента</p>
      <img src={item.image_large} alt='' />
      <p className={`text text_type_main-medium m-4 ${styles.aaa}`}>{item.name}</p>
      <section className={styles.ingredient_composition}>
        {Object.entries(INGREDIENT_UNITS_MAPPING).map(([k, v], i) => {
          return (
            <div className='m-3' key={k}>
              <p className={`text text_type_main-small text_color_inactive ${styles.ingredient_composition_item}`}>
                {v}
              </p>
              <p className={`text text_type_main-small text_color_inactive ${styles.ingredient_composition_item}`}>
                {item[k]}
              </p>
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default IngredientDetail
