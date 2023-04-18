import { composeWithDevTools } from '@redux-devtools/extension'
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { logMiddleware } from './middlewares/log-middleware'
import { rootReducer } from './reducer'

export const initStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(logMiddleware, thunkMiddleware))
  )
  return store
}
