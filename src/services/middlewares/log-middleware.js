import { ADD_CONSTRUCTOR_ITEM, REMOVE_CONSTRUCTOR_ITEM } from '../constructor/actions'
import { decreaseIngredientCounter, increaseIngredientCounter } from '../ingredients/actions'

export const logMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // switch (action.type) {
    //   case ADD_CONSTRUCTOR_ITEM:
    //     dispatch(increaseIngredientCounter(action.payload.item))
    //     break
    //   case REMOVE_CONSTRUCTOR_ITEM:
    //     dispatch(decreaseIngredientCounter(action.payload.item))
    //     break
    //   default:
    // }

    next(action)
  }
