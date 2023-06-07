import { createReducer } from '@reduxjs/toolkit'

import { RootState } from '../store'
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from './actions'

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING.',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

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

export type TFeed = {
  orders: TFeedOrder[]
  total: number | null
  totalToday: number | null
}

export type TwsState = {
  wsStatus: WebsocketStatus
  wsError: string
}

interface IFeedState extends TFeed, TwsState {}

const initialState: IFeedState = {
  orders: [],
  total: null,
  totalToday: null,
  wsStatus: WebsocketStatus.OFFLINE,
  wsError: '',
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.wsStatus = WebsocketStatus.CONNECTING
    })
    .addCase(wsOpen, (state) => {
      state.wsStatus = WebsocketStatus.ONLINE
      state.wsError = ''
    })
    .addCase(wsClose, (state) => {
      // return initialState
      state.wsStatus = WebsocketStatus.OFFLINE
    })
    .addCase(wsError, (state, action) => {
      state.wsError = action.payload
    })
    .addCase(wsMessage, (state, action) => {
      return { ...state, ...action.payload }
    })
})

export const selectWsState = (state: RootState) => ({ wsStatus: state.feed.wsStatus, wsError: state.feed.wsError })
export const selectFeedTotal = (state: RootState) => ({ total: state.feed.total, totalToday: state.feed.totalToday })
export const selectOrders = (state: RootState) => state.feed.orders
export const selectOrder = (id: string | undefined) => (store: RootState) =>
  store.feed.orders.find((v) => v._id === id) || null

export const selectDoneOrders =
  (limit = 7) =>
  (state: RootState) =>
    state.feed.orders.filter((v) => v.status === FeedOrderStatus.done).slice(0, limit)
export const selectPendingOrders =
  (limit = 7) =>
  (state: RootState) =>
    state.feed.orders.filter((v) => v.status === FeedOrderStatus.pending).slice(0, limit)

export default reducer
