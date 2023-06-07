import { createAction } from '@reduxjs/toolkit'

import { TFeed } from './reducer'

export const connectFeed = createAction<string, 'feed/connectFeed'>('feed/connectFeed') // ???
export const disconnectFeed = createAction('feed/disconnectFeed') // ???

export const wsConnecting = createAction('feed/wsConnecting')
export const wsOpen = createAction('feed/wsOpen')
export const wsClose = createAction('feed/wsClose')
export const wsMessage = createAction<TFeed, 'feed/wsMessage'>('feed/wsMessage')
export const wsError = createAction<string, 'feed/wsError'>('feed/wsError')

// зачем это ???
export type TwsActions =
  | ReturnType<typeof connectFeed>
  | ReturnType<typeof disconnectFeed>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>
