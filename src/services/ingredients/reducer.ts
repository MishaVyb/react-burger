import { createSlice } from '@reduxjs/toolkit'

import { TBurgerIngredient } from '../../utils/types'
import { addConstructorBun, addConstructorFilling, removeConstructorItem } from '../constructor/reducer'
import { RootState } from '../store'
import { loadIngredients } from './actions'

interface IIngredientState {
  items: TBurgerIngredient[]
  error: string | null | undefined
  pendingRequest: boolean
}

const initialState: IIngredientState = {
  items: [],
  error: null,
  pendingRequest: false,
}

export const counterSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadIngredients.pending, (state, action) => {
      state.pendingRequest = true
    })
    builder.addCase(loadIngredients.fulfilled, (state, action) => {
      state.pendingRequest = false
      state.items = action.payload
      state.error = null
    })
    builder.addCase(loadIngredients.rejected, (state, action) => {
      state.pendingRequest = false
      if (action.payload) state.error = action.payload
      else state.error = action.error.message
    })

    builder.addCase(addConstructorBun, (state, action) => {
      return {
        ...state,
        items: state.items.map((v) => {
          if (v._id === action.payload._id) {
            return { ...v, counter: 2 }
          }
          return { ...v, counter: 0 }
        }),
      }
    })
    builder.addCase(addConstructorFilling, (state, action) => {
      return {
        ...state,
        items: state.items.map((v) => {
          if (v._id === action.payload.item._id) {
            return { ...v, counter: v.counter ? v.counter + 1 : 1 }
          }
          return v
        }),
      }
    })
    builder.addCase(removeConstructorItem, (state, action) => {
      return {
        ...state,
        items: state.items.map((item) => {
          if (item._id === action.payload.item._id) {
            if (!item.counter) return item
            return { ...item, counter: item.counter - 1 }
          }
          return item
        }),
      }
    })
  },
})

export const selectIngredientsItems = (store: RootState) => store.ingredients.items
export const selectIngredientsItem = (id: string | undefined) => (store: RootState) =>
  store.ingredients.items.find((v) => v._id === id) || null

export default counterSlice.reducer
