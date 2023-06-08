import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { Middleware } from 'redux'

import { fetchTokensAction } from '../auth/actions'

export type TwsActionTypes<TwsMessageSend, TwsMessageReceve> = {
  wsConnect: ActionCreatorWithPayload<string>
  wsDisconnect: ActionCreatorWithoutPayload
  wsSendMessage?: ActionCreatorWithPayload<TwsMessageSend>
  wsConnecting: ActionCreatorWithoutPayload
  onOpen: ActionCreatorWithoutPayload
  onClose: ActionCreatorWithoutPayload
  onError: ActionCreatorWithPayload<string>
  onMessage: ActionCreatorWithPayload<TwsMessageReceve>
}

export const socketMiddleware = <TwsMessageSend, TwsMessageReceve>(
  wsActions: TwsActionTypes<TwsMessageSend, TwsMessageReceve>
): Middleware<void, ToolkitStore> => {
  return (store) => {
    let socket: WebSocket | null = null
    let isConnected = false
    let reconnectTimer = 0
    let url = ''

    return (next) => (action) => {
      const { dispatch } = store
      const { wsConnect, wsDisconnect, wsSendMessage, onOpen, onClose, onError, onMessage, wsConnecting } = wsActions

      if (wsConnect.match(action)) {
        console.log('WebSocket. Connect. ')
        url = action.payload
        socket = new WebSocket(url)
        isConnected = true
        dispatch(wsConnecting())
      }

      if (socket) {
        socket.onopen = () => {
          console.log('WebSocket. Open. ')
          dispatch(onOpen())
        }

        socket.onerror = (err) => {
          console.log('WebSocket. Error. ')
          dispatch(onError(JSON.stringify(err)))
        }

        socket.onmessage = (event) => {
          const { data } = event
          const parsedData = JSON.parse(data)
          if (!parsedData.success) {
            // NOT OK
            //
            if (parsedData.message === 'Invalid or missing token') {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              dispatch(fetchTokensAction())
            }
            console.log('WebSocket. Receve message with error. ', parsedData)
            dispatch(onError(JSON.stringify(parsedData.message || parsedData)))
          } else {
            // OK
            //
            console.log('WebSocket. Receve message. ', parsedData)
            dispatch(onMessage(parsedData))
          }
        }

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            console.log('WebSocket. Error onclose. ')
            dispatch(onError(event.code.toString()))
          }

          console.log('WebSocket. Close. ')
          dispatch(onClose())

          if (isConnected) {
            dispatch(wsConnecting())
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnect(url))
            }, 3000)
          }
        }

        if (wsSendMessage && wsSendMessage.match(action)) {
          console.log('WebSocket. Send message. ', action.payload)
          socket.send(JSON.stringify(action.payload))
        }

        if (wsDisconnect.match(action)) {
          console.log('WebSocket. Disconnect. ')

          clearTimeout(reconnectTimer)
          isConnected = false
          reconnectTimer = 0
          socket.close()
          dispatch(onClose())
        }
      }

      next(action)
    }
  }
}
