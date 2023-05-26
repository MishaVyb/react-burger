import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { setCurrentIngredientDetail, unsetCurrentIngredientDetail } from '../../../services/ingredientDetail/actions'
import { loadIngredients } from '../../../services/ingredients/actions'
import { selectIngredientsItem } from '../../../services/ingredients/selectors'
import { TBurgerIngredient } from '../../../utils/types'
import styles from './styles.module.css'

type TUnitsMapping = {
  [key in keyof TBurgerIngredient]?: string
}

const INGREDIENT_UNITS_MAPPING: TUnitsMapping = {
  calories: 'Калории, ккал',
  proteins: 'Белки, г',
  fat: 'Жиры, г',
  carbohydrates: 'Углеводы, г',
}

const IngredientDetail: FC = () => {
  const { id } = useParams()
  const ingredient: TBurgerIngredient | null = useSelector(selectIngredientsItem(id))
  const dispatch = useDispatch()

  // Set current ingredient as modal content and load ingredient if it are opened by external link
  useEffect(() => {
    if (ingredient) dispatch(setCurrentIngredientDetail(ingredient))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    else dispatch(loadIngredients())
    return () => {
      dispatch(unsetCurrentIngredientDetail())
    }
  }, [dispatch, ingredient])

  const item = ingredient
  if (!item) return <p className='text text_type_main-large'>Ингредиент не найден :(</p>

  return (
    <div className={styles.container}>
      <p className={`text text_type_main-large ${styles.title}`}>Детали ингредиента</p>
      <img src={item.image_large} alt='' />
      <p className='text text_type_main-medium m-4'>{item.name}</p>
      <section className={styles.ingredient_composition}>
        {Object.entries(INGREDIENT_UNITS_MAPPING).map(([k, v], i) => {
          return (
            <div className='m-3' key={k}>
              <p className={`text text_type_main-small text_color_inactive ${styles.ingredient_composition_item}`}>
                {v}
              </p>
              <p className={`text text_type_main-small text_color_inactive ${styles.ingredient_composition_item}`}>
                {item[k as keyof TBurgerIngredient]}
              </p>
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default IngredientDetail
