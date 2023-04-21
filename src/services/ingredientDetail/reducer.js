import { SET_CURRENT_INGREDIENT_DETAIL, UNSET_CURRENT_INGREDIENT_DETAIL } from './actions'

const initialStore = {
  current: null,
}

export const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT_DETAIL:
      return {
        ...store,
        current: action.payload.item,
      }
    case UNSET_CURRENT_INGREDIENT_DETAIL:
      return {
        ...store,
        current: null,
      }
    default:
      return store
  }
}
