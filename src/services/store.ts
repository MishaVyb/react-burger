import { configureStore } from '@reduxjs/toolkit'

import { loadFromLocalStorage } from '../utils/persistence'
import authReducer, { IAuthState } from './auth/reducer'
import constructorReducer from './constructor/reducer'
import ingredientDetailReducer from './ingredientDetail/reducer'
import ingredientReducer from './ingredients/reducer'
import orderReducer from './order/reducer'

const preloadedState = {
  auth: loadFromLocalStorage<IAuthState>('auth'),
}

export const store = configureStore({
  reducer: {
    ingredients: ingredientReducer,
    burgerConstructor: constructorReducer,
    ingredientDetail: ingredientDetailReducer,
    order: orderReducer,
    auth: authReducer,
  },
  preloadedState: preloadedState,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
