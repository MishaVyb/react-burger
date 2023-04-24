import { combineReducers } from 'redux'

import { reducer as burgerConstructorReducer } from './constructor/reducer'
import { reducer as ingredientDetailReducer } from './ingredientDetail/reducer'
import { reducer as ingredientsReducer } from './ingredients/reducer'
import { reducer as orderReducer } from './order/reducer'

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  ingredientDetail: ingredientDetailReducer,
})
