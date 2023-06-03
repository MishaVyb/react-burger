import { TBurgerIngredient } from '../../utils/types'

export const ADD_CONSTRUCTOR_ITEM = 'ADD_CONSTRUCTOR_ITEM'
export const MOVE_CONSTRUCTOR_ITEM = 'MOVE_CONSTRUCTOR_ITEM'
export const REMOVE_CONSTRUCTOR_ITEM = 'REMOVE_CONSTRUCTOR_ITEM'
export const SET_MOVING_ITEM_INDEX = 'SET_MOVING_ITEM_INDEX'

export const addConstructorItem = (item: TBurgerIngredient, index: number | undefined) => ({
  type: ADD_CONSTRUCTOR_ITEM,
  payload: { item, index, key: crypto.randomUUID() },
})

export const moveConstructorItem = (dragIndex: number, hoverIndex: number) => ({
  type: MOVE_CONSTRUCTOR_ITEM,
  payload: { dragIndex, hoverIndex },
})

export const removeConstructorItem = (item: TBurgerIngredient, index: number | null | undefined) => ({
  type: REMOVE_CONSTRUCTOR_ITEM,
  payload: { item, index },
})

export const setMovingItemIndex = (index: number | null | undefined) => ({
  type: SET_MOVING_ITEM_INDEX,
  payload: { index },
})
