import { fetchOrder } from '../../utils/burger-api'

export const LOAD_ORDER_REQUEST = 'LOAD_ORDER_REQUEST'
export const LOAD_ORDER_ERROR = 'LOAD_ORDER_ERROR'
export const LOAD_ORDER_SUCCESS = 'LOAD_ORDER_SUCCESS'

export const loadOrder = (ingredients, bun) => (dispatch) => {
  dispatch({
    type: LOAD_ORDER_REQUEST,
  })

  const body = { ingredients: [...ingredients.map((v) => v._id), bun._id] }
  console.log('BODY ', body)
  fetchOrder(body)
    .then((json) =>
      dispatch({
        type: LOAD_ORDER_SUCCESS,
        payload: json,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOAD_ORDER_ERROR,
        payload: err,
      })
    )
}
