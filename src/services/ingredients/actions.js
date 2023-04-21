import { fetchIngredients } from '../../utils/burger-api'

export const LOAD_INGREDIENTS_REQUEST = 'LOAD_INGREDIENTS_REQUEST'
export const LOAD_INGREDIENTS_ERROR = 'LOAD_INGREDIENTS_ERROR'
export const LOAD_INGREDIENTS_SUCCESS = 'LOAD_INGREDIENTS_SUCCESS'
export const INCREASE_INGREDIENT_COUNTER = 'INCREASE_INGREDIENT_COUNTER'
export const DECREASE_INGREDIENT_COUNTER = 'DECREASE_INGREDIENT_COUNTER'

export const loadIngredients = () => (dispatch) => {
  dispatch({
    type: LOAD_INGREDIENTS_REQUEST,
  })

  fetchIngredients()
    .then((json) =>
      dispatch({
        type: LOAD_INGREDIENTS_SUCCESS,
        payload: json.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOAD_INGREDIENTS_ERROR,
        payload: err,
      })
    )
}

export const increaseIngredientCounter = (item) => ({
  type: INCREASE_INGREDIENT_COUNTER,
  payload: { item },
})

export const decreaseIngredientCounter = (item) => (dispatch) => ({
  type: DECREASE_INGREDIENT_COUNTER,
  payload: { item },
})
