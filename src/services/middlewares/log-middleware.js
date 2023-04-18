export const logMiddleware = (store) => (next) => (action) => {
  // TODO
  // console.log('store', store)
  // console.log('next', next)
  // console.log('action', action)

  next(action)
}
