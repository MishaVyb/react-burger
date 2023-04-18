export const selectConstructorBuns = (store) => {
  console.log(store)
  return store.burgerConstructor.bun
}
export const selectConstructorItems = (store) => store.burgerConstructor.items
