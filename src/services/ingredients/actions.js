import fetchIngredients from '../../utils/burger-api'

export const LOAD_INGREDIENTS_REQUEST = 'LOAD_INGREDIENTS_REQUEST'
export const LOAD_INGREDIENTS_ERROR = 'LOAD_INGREDIENTS_ERROR'
export const LOAD_INGREDIENTS_SUCCESS = 'LOAD_INGREDIENTS_SUCCESS'

export const loadIngredients = () => (dispatch) => {
  dispatch({
    type: LOAD_INGREDIENTS_REQUEST,
  })

  fetchIngredients()
    .then((response) =>
      dispatch({
        type: LOAD_INGREDIENTS_SUCCESS,
        payload: response,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOAD_INGREDIENTS_ERROR,
        payload: err,
      })
    )
}
