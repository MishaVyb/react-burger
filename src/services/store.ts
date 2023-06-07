import { configureStore } from '@reduxjs/toolkit'

import { loadFromLocalStorage } from '../utils/persistence'
import authReducer, { IAuthState } from './auth/reducer'
import constructorReducer from './constructor/reducer'
import { connectFeed, disconnectFeed, wsClose, wsConnecting, wsError, wsMessage, wsOpen } from './feed/actions'
import feedReducer from './feed/reducer'
import ingredientDetailReducer from './ingredientDetail/reducer'
import ingredientReducer from './ingredients/reducer'
import { socketMiddleware } from './middlewares/socket-middleware'
import orderReducer from './order/reducer'

const preloadedState = {
  auth: loadFromLocalStorage<IAuthState>('auth'),
}

const feedSocketMiddleware = socketMiddleware({
  wsConnect: connectFeed,
  wsDisconnect: disconnectFeed,
  // wsSendMessage: wsMessage,
  wsConnecting: wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
})

export const store = configureStore({
  reducer: {
    ingredients: ingredientReducer,
    burgerConstructor: constructorReducer,
    ingredientDetail: ingredientDetailReducer,
    order: orderReducer,
    feed: feedReducer,
    auth: authReducer,
  },
  preloadedState: preloadedState,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(feedSocketMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
