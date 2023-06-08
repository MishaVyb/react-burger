import { AsyncThunk, createAction, createAsyncThunk } from '@reduxjs/toolkit'

import {
  fetchForgotPassword,
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchResetPassword,
  fetchTokenUpdate,
  fetchUpdateUser,
  fetchUser,
} from '../../utils/burger-api'
import { RootState } from '../store'
import { IAuthFull, IAuthSimplified, ITokens, selectAuth, selectRefreshToken } from './reducer'

export interface ILoginPayload {
  email: string
}
export interface IMakeLoginPayload extends ILoginPayload {
  password: string
}
export interface IUserPayload extends IMakeLoginPayload {
  name: string
}
export interface IResetPasswordPayload {
  password: string
  token: string
}
interface ThunkApiConfig {
  rejectValue: string
  state: RootState
}

export type TAuthAsyncThunk = AsyncThunk<
  IAuthSimplified | IAuthFull | void,
  ILoginPayload | IMakeLoginPayload | IUserPayload | IResetPasswordPayload,
  ThunkApiConfig
>

export type TPendingAction = ReturnType<TAuthAsyncThunk['pending']>
export type TRejectedAction = ReturnType<TAuthAsyncThunk['rejected']>
export type TFulfilledAction = ReturnType<TAuthAsyncThunk['fulfilled']>

export const updateTokensAction = createAction<ITokens>('auth/updateTokensAction')
export type TUpdateTokensAction = ReturnType<typeof updateTokensAction>
export const resetRequestStatusAction = createAction('auth/resetRequestStatusAction')
export type TResetRequestStatusAction = ReturnType<typeof resetRequestStatusAction>

export const loadLogin = createAsyncThunk<IAuthFull, IMakeLoginPayload, ThunkApiConfig>(
  'auth/loadLogin',
  async (payload, thunkApi) => {
    try {
      return await fetchLogin(payload)
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e)
      return thunkApi.rejectWithValue(message)
    }
  }
)

export const loadUser = createAsyncThunk<IAuthSimplified, void, ThunkApiConfig>(
  'auth/loadUser',
  async (_, thunkApi) => {
    try {
      const res = await fetchUser(selectAuth(thunkApi.getState()), (newTokens: ITokens) =>
        thunkApi.dispatch(updateTokensAction(newTokens))
      )
      return res
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e)
      return thunkApi.rejectWithValue(message)
    }
  }
)

export const updateUser = createAsyncThunk<IAuthSimplified, IUserPayload, ThunkApiConfig>(
  'auth/updateUser',
  async (payload, thunkApi) => {
    try {
      const res = await fetchUpdateUser(payload, selectAuth(thunkApi.getState()), (newTokens: ITokens) =>
        thunkApi.dispatch(updateTokensAction(newTokens))
      )
      return res
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e)
      return thunkApi.rejectWithValue(message)
    }
  }
)

export const fetchTokensAction = createAsyncThunk<void, void, ThunkApiConfig>('auth/loadUser', async (_, thunkApi) => {
  try {
    const res = await fetchTokenUpdate(selectAuth(thunkApi.getState()))
    thunkApi.dispatch(updateTokensAction(res))
  } catch (e) {
    const message = e instanceof Error ? e.message : JSON.stringify(e)
    return thunkApi.rejectWithValue(message)
  }
})

export const loadRegister = createAsyncThunk<IAuthSimplified, IUserPayload, ThunkApiConfig>(
  'auth/loadRegister',
  async (payload, thunkApi) => {
    try {
      const res = await fetchRegister(payload)
      return res
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e)
      return thunkApi.rejectWithValue(message)
    }
  }
)

export const loadForgotPassword = createAsyncThunk<void, ILoginPayload, ThunkApiConfig>(
  'auth/loadForgotPassword',
  async (payload, thunkApi) => {
    try {
      await fetchForgotPassword(payload)
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e)
      return thunkApi.rejectWithValue(message)
    }
  }
)

export const loadResetPassword = createAsyncThunk<void, IResetPasswordPayload, ThunkApiConfig>(
  'auth/loadResetPassword',
  async (payload, thunkApi) => {
    try {
      await fetchResetPassword(payload)
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e)
      return thunkApi.rejectWithValue(message)
    }
  }
)

export const loadLogout = createAsyncThunk<void, void, ThunkApiConfig>('auth/loadLogout', async (_, thunkApi) => {
  try {
    const token = selectRefreshToken(thunkApi.getState())
    await fetchLogout({ token })
  } catch (e) {
    const message = e instanceof Error ? e.message : JSON.stringify(e)
    return thunkApi.rejectWithValue(message)
  }
})
