import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { TBurgerIngredient } from '../../utils/types'
import { RootState } from '../store'

const initialState: { current: TBurgerIngredient | null } = {
  current: null,
}

export const counterSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setCurrentIngredientDetail: (state, action: PayloadAction<TBurgerIngredient>) => {
      state.current = action.payload
    },
    unsetCurrentIngredientDetail: (state) => {
      state.current = null
    },
  },
})

// Actions:
export const { setCurrentIngredientDetail, unsetCurrentIngredientDetail } = counterSlice.actions

// Selectors:
export const selectIngredientDetail = (state: RootState) => state.ingredientDetail.current

// Reducer:
export default counterSlice.reducer
