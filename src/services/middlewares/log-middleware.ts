import { Middleware } from 'redux'

export const logMiddleware: Middleware = () => (next) => (action) => {
  // ...
  next(action)
}
