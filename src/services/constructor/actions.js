export const ADD_CONSTRUCTOR_ITEM = 'ADD_CONSTRUCTOR_ITEM'

export const addConstructorItem = (item, index) => ({
  type: ADD_CONSTRUCTOR_ITEM,
  payload: { item, index },
})
