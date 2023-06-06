import { createAsyncThunk } from '@reduxjs/toolkit'

import { fetchOrder } from '../../utils/burger-api'
import { TBunIngredient, TFillingIngredient } from '../../utils/types'

export const loadOrder = createAsyncThunk<
  { name: string; number: number }, // Return type of the payload creator
  { items: TFillingIngredient[]; bun: TBunIngredient | null }, // First argument to the payload creator
  { rejectValue: string } // Types for ThunkAPI
>(
  'ingredients/loadOrder',

  async ({ items, bun }, thunkApi) => {
    try {
      if (!bun) throw Error('No bun. Burger constructor must have buns and fillings to make an order. ')
      const ingredientIds = { ingredients: [...items.map((v) => v._id), bun._id] }
      return await fetchOrder(ingredientIds)
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e)
      return thunkApi.rejectWithValue(message)
    }
  }
)
