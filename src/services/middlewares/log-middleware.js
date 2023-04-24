export const logMiddleware = (store) => (next) => (action) => {
  // ...
  next(action)
}
