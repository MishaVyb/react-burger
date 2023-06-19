import { createAsyncThunk } from '@reduxjs/toolkit'

import { fetchIngredients } from '../../utils/burger-api'
import { safeAsyncThunk } from '../../utils/thunk'
import { TBurgerIngredient } from '../../utils/types'

export const loadIngredients = createAsyncThunk<TBurgerIngredient[], void, { rejectValue: string }>(
  'ingredients/loadIngredients',
  async (_, thunkApi) => safeAsyncThunk<TBurgerIngredient[]>(thunkApi, fetchIngredients)
)
