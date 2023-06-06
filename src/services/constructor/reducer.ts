import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UUID } from 'crypto'

import { TBunIngredient, TFillingIngredient } from '../../utils/types'
import { RootState } from '../store'

interface IConstructorState {
  items: TFillingIngredient[]
  bun: TBunIngredient | null
  movingItemIndex: number | null | undefined // index for element which is moving (dragging) inside burger-constructor
}

const initialState: IConstructorState = {
  bun: null,
  items: [],
  movingItemIndex: null,
}

export const counterSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addConstructorBun: (state, action: PayloadAction<TBunIngredient>) => {
      state.bun = action.payload
    },
    addConstructorFilling: (state, action: PayloadAction<{ item: TFillingIngredient; index: number; key: UUID }>) => {
      const newItem = { ...action.payload.item, _key: action.payload.key }
      state.items.splice(action.payload.index, 0, newItem)
    },
    removeConstructorItem: (state, action: PayloadAction<{ item: TFillingIngredient; index: number }>) => {
      state.items.splice(action.payload.index, 1)
    },
    moveConstructorItem: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
      // removing what we are dragging
      const [targetItem] = state.items.splice(action.payload.dragIndex, 1)
      // inserting it into hoverIndex
      state.items.splice(action.payload.hoverIndex, 0, targetItem)
    },
    setMovingItemIndex: (state, action: PayloadAction<number | null | undefined>) => {
      state.movingItemIndex = action.payload
    },
  },
})

// Actions:
export const {
  addConstructorBun,
  addConstructorFilling,
  removeConstructorItem,
  moveConstructorItem,
  setMovingItemIndex,
} = counterSlice.actions

// Selectors:
export const selectConstructorBun = (state: RootState) => state.burgerConstructor.bun
export const selectConstructorItems = (state: RootState) => state.burgerConstructor.items
export const selectConstructorMovingItemIndex = (state: RootState) => state.burgerConstructor.movingItemIndex
export const selectConstructorTotal = (state: RootState) => {
  const { items, bun } = state.burgerConstructor
  return items.reduce((acc, item) => acc + item.price, 0) + (bun?.price || 0) * 2
}
export const selectConstructorIsComplete = (state: RootState) =>
  !!(state.burgerConstructor.items.length && state.burgerConstructor.bun)

// Reducer:
export default counterSlice.reducer
