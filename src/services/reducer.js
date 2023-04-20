import { combineReducers } from 'redux'

import { reducer as constructorReducer } from './constructor/reducer'
import { reducer as ingredientsReducer } from './ingredients/reducer'
import { reducer as orderReducer } from './order/reducer'

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer, // TODO burgerIngredients
  burgerConstructor: constructorReducer,
  order: orderReducer,
})
