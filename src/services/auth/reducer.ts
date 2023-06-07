import { createReducer } from '@reduxjs/toolkit'

import { removeFromLocalStorage, saveToLocalStorage } from '../../utils/persistence'
import { RootState } from '../store'
import {
  TFulfilledAction,
  TPendingAction,
  TRejectedAction,
  TResetRequestStatusAction,
  TUpdateTokensAction,
  loadLogout,
  resetRequestStatusAction,
  updateTokensAction,
} from './actions'

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export interface IUser {
  name: string
  email: string
}

export interface IAuthSimplified {
  user: IUser
}
export interface IAuthFull extends ITokens, IAuthSimplified {}

export interface IAuthState extends ITokens {
  user: IUser
  error: string | undefined
  pendingRequest: boolean
}

const initialState: IAuthState = {
  user: { name: '', email: '' },
  accessToken: '',
  refreshToken: '',
  error: undefined,
  pendingRequest: false,
}

const reducer = createReducer(initialState, (builder) => {
  builder.addMatcher<TPendingAction>(
    (action): action is TPendingAction => action.type.endsWith('/pending'),
    (state) => {
      state.pendingRequest = true
    }
  )
  builder.addMatcher<TRejectedAction>(
    (action): action is TRejectedAction => action.type.endsWith('/rejected'),
    (state, action) => {
      state.pendingRequest = false

      // removeFromLocalStorage('auth') // ??? для всех кроме LOAD_USER_UPDATE_ERROR
      if (action.payload) state.error = action.payload
      else state.error = action.error.message
    }
  )
  builder.addMatcher<TFulfilledAction | TResetRequestStatusAction>(
    (action): action is TFulfilledAction | TResetRequestStatusAction =>
      action.type.endsWith('/fulfilled') || resetRequestStatusAction.match(action),
    (state) => {
      state.pendingRequest = false
      state.error = undefined
    }
  )
  builder.addMatcher<TFulfilledAction | TUpdateTokensAction>(
    (action): action is TFulfilledAction | TUpdateTokensAction =>
      action.type.endsWith('/fulfilled') || updateTokensAction.match(action),
    (state, action) => {
      if (action.payload) {
        return saveToLocalStorage('auth', { ...state, ...action.payload })
      }
    }
  )
  builder.addMatcher(
    (action) => loadLogout.fulfilled.match(action),
    () => {
      removeFromLocalStorage('auth')
      return initialState
    }
  )
})

export const selectAuthRequestStatus = (state: RootState): [boolean, string | undefined] => [
  state.auth.pendingRequest,
  state.auth.error,
]
export const selectAuth = (state: RootState) => state.auth
export const selectUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => !!state.auth.accessToken
export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectAccessTokenSimplified = (state: RootState) => state.auth.accessToken.replace('Bearer ', '')
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken

export default reducer
