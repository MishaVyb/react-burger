export const selectConstructorBuns = (store) => store.burgerConstructor.bun // TODO rename selectConstructorBun
export const selectConstructorItems = (store) => store.burgerConstructor.items
export const selectConstructorMovingItemIndex = (store) => store.burgerConstructor.movingItemIndex
export const selectConstructorTotal = (store) => {
  const { items, bun } = store.burgerConstructor
  return items.reduce((acc, item) => acc + item.price, 0) + (bun?.price || 0) * 2
}
