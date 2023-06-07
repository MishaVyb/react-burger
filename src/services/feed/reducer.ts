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
    .addCase(wsClose, () => {
      return initialState // Release socket data from store on close
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
  (chunkSize = 10) =>
  (state: RootState) => {
    const chunks = []
    const orders = state.feed.orders.filter((v) => v.status === FeedOrderStatus.done)
    for (let i = 0; i < orders.length; i += chunkSize) {
      const chunk = orders.slice(i, i + chunkSize)
      chunks.push(chunk)
    }
    return chunks
  }

export const selectPendingOrders =
  (chunkSize = 10) =>
  (state: RootState) => {
    const chunks = []
    const orders = state.feed.orders.filter((v) => v.status === FeedOrderStatus.pending)
    for (let i = 0; i < orders.length; i += chunkSize) {
      const chunk = orders.slice(i, i + chunkSize)
      chunks.push(chunk)
    }
    return chunks
  }

export default reducer
