export const selectIngredientsItems = (store) => store.ingredients.items
export const selectIngredientsItem = (id) => (store) => store.ingredients.items.find((v) => v._id === id) || null
