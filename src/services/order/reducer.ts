import { createReducer } from '@reduxjs/toolkit'

import { RootState } from '../store'
import { loadOrder } from './actions'

interface IOrderState {
  name: string | null
  number: number | null
  error: string | null | undefined
  pendingRequest: boolean
}

const initialState: IOrderState = {
  name: null,
  number: null,
  error: null,
  pendingRequest: false,
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOrder.pending, (state) => {
      state.pendingRequest = true
    })
    .addCase(loadOrder.fulfilled, (state, action) => {
      state.pendingRequest = false
      state.error = null
      state.name = action.payload.name
      state.number = action.payload.number
    })
    .addCase(loadOrder.rejected, (state, action) => {
      state.pendingRequest = false
      if (action.payload) state.error = action.payload
      else state.error = action.error.message
    })
})

export const selectOrder = (state: RootState) => ({ name: state.order.name, number: state.order.number })

export default reducer
