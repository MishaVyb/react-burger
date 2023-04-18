export const ADD_CONSTRUCTOR_ITEM = 'ADD_CONSTRUCTOR_ITEM'
export const SET_HOVERED_ITEM_INDEX = 'SET_HOVERED_ITEM_INDEX'
export const MOVE_CONSTRUCTOR_ITEM = 'MOVE_CONSTRUCTOR_ITEM'

export const addConstructorItem = (item, index) => ({
  type: ADD_CONSTRUCTOR_ITEM,
  payload: { item, index },
})

export const moveConstructorItem = (dragIndex, hoverIndex) => ({
  type: MOVE_CONSTRUCTOR_ITEM,
  payload: { dragIndex, hoverIndex },
})

export const setHoveredItemIndex = (index) => ({
  type: SET_HOVERED_ITEM_INDEX,
  payload: index,
})
