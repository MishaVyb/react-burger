import { createReducer } from '@reduxjs/toolkit'

import { FEED_ALL_DATA } from '../../utils/data'
import { RootState } from '../store'

export enum FeedOrderStatus {
  done = 'done',
  created = 'created',
  pending = 'pending',
}

export enum FeedOrderStatusVerbose {
  done = 'Выполнен',
  created = 'Создан',
  pending = 'Готовится',
}

// export const aaa = FeedOrderStatusVerbose[FeedOrderStatus.done] // XXX

export type TFeedOrder = {
  _id: string
  ingredients: string[]
  status: FeedOrderStatus
  name: string
  createdAt: string
  updatedAt: string
  number: number
}

interface IFeedState {
  orders: TFeedOrder[]
  total: number
  totalToday: number
}

// TODO
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const initialState: IFeedState = FEED_ALL_DATA

const reducer = createReducer(initialState, (builder) => {
  // builder
  //   .addCase(loadOrder.pending, (state) => {
  //     state.pendingRequest = true
  //   })
  //   .addCase(loadOrder.fulfilled, (state, action) => {
  //     state.pendingRequest = false
  //     state.error = null
  //     state.name = action.payload.name
  //     state.number = action.payload.number
  //   })
  //   .addCase(loadOrder.rejected, (state, action) => {
  //     state.pendingRequest = false
  //     if (action.payload) state.error = action.payload
  //     else state.error = action.error.message
  //   })
})

export const selectFeedTotal = (state: RootState) => ({ total: state.feed.total, totalToday: state.feed.totalToday })
export const selectOrders = (state: RootState) => {
  // UNUSED
  // TODO перенести в редусер, чтобы не мутировать в селекторе
  // state.feed.orders.map((order) => {
  //   return order.ingredients.map((ingredientId) => {
  //     return selectIngredientsItem(ingredientId)
  //   })
  // })

  return state.feed.orders
}
export const selectOrder = (id: string | undefined) => (store: RootState) =>
  store.feed.orders.find((v) => v._id === id) || null

export const selectDoneOrders = (state: RootState) => state.feed.orders.filter((v) => v.status === FeedOrderStatus.done)
export const selectPendingOrders = (state: RootState) =>
  state.feed.orders.filter((v) => v.status === FeedOrderStatus.pending)

export default reducer
