export const ADD_CONSTRUCTOR_ITEM = 'ADD_CONSTRUCTOR_ITEM'
export const MOVE_CONSTRUCTOR_ITEM = 'MOVE_CONSTRUCTOR_ITEM'
export const REMOVE_CONSTRUCTOR_ITEM = 'REMOVE_CONSTRUCTOR_ITEM'
export const SET_MOVING_ITEM_INDEX = 'SET_MOVING_ITEM_INDEX'

export const addConstructorItem = (item, index) => ({
  type: ADD_CONSTRUCTOR_ITEM,
  payload: { item, index },
})

export const moveConstructorItem = (dragIndex, hoverIndex) => ({
  type: MOVE_CONSTRUCTOR_ITEM,
  payload: { dragIndex, hoverIndex },
})

export const removeConstructorItem = (item, index) => ({
  type: REMOVE_CONSTRUCTOR_ITEM,
  payload: { item, index },
})

export const setMovingItemIndex = (index) => ({
  type: SET_MOVING_ITEM_INDEX,
  payload: { index },
})
