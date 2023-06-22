import { ILoginPayload, IMakeLoginPayload, IResetPasswordPayload, IUserPayload } from '../services/auth/actions'
import { ITokens, IUser } from '../services/auth/reducer'
import { TBurgerIngredient } from './types'

const ROOT_ENDPOINT = 'https://norma.nomoreparties.space/api'
export const WS_ORDERS_URL = 'wss://norma.nomoreparties.space/orders'
export const WS_FEED_URL = 'wss://norma.nomoreparties.space/orders/all'

type TOnTokenUpdatesCallback = (newTokens: ITokens) => void

interface ISuccessResponse {
  success: true
}

interface IDataResponse<T> extends ISuccessResponse {
  data: T
}

interface IUserResponse extends ISuccessResponse {
  user: IUser
}
interface ILoginResponse extends IUserResponse, ITokens {}
interface ITokenUpdateResponse extends ISuccessResponse, ITokens {}

interface IOrderResponse {
  name: string
  order: { number: number }
}

export const checkResponse = async <T = ISuccessResponse>(res: Response): Promise<T> => {
  if (res.ok) return await res.json()

  let requestFailsReason: string | object = ''
  try {
    const json = await res.json()
    requestFailsReason = json.message || json
  } catch (e) {
    // reason is not a json, reject with plain text
    requestFailsReason = await res.text()
  }
  console.log({ requestFailsReason })
  return Promise.reject(requestFailsReason)
}

export const fetchTokenUpdate = async (auth: ITokens) => {
  if (!auth.refreshToken) throw Error('No refresh token. Please, login again. ')

  const res = await fetch(`${ROOT_ENDPOINT}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: auth.refreshToken }),
  })
  return checkResponse<ITokenUpdateResponse>(res)
}

export const fetchUser = async (auth: ITokens, onTokenUpdates: TOnTokenUpdatesCallback) => {
  if (!auth.accessToken) throw Error('No access token. Please, login again. ')

  try {
    const res = await fetch(`${ROOT_ENDPOINT}/auth/user`, {
      method: 'GET',
      headers: { Authorization: auth.accessToken },
    })
    return await checkResponse<IUserResponse>(res)
  } catch (e) {
    //
    // RETRY
    console.log('Retry. Handling error. ', e)
    try {
      const newTokens = await fetchTokenUpdate(auth)
      //
      // RETRY OK
      console.log('Retry. Handle error successfully. ', { newTokens })
      onTokenUpdates(newTokens)
      const res = await fetch(`${ROOT_ENDPOINT}/auth/user`, {
        method: 'GET',
        headers: { Authorization: newTokens.accessToken },
      })
      return await checkResponse<IUserResponse>(res)
    } catch (e_1) {
      //
      // RETRY NOT OK
      console.log('Retry. Handling error failed. ', e_1)
      throw e_1
    }
  }
}

export const fetchUpdateUser = async (body: IUserPayload, auth: ITokens, onTokenUpdates: TOnTokenUpdatesCallback) => {
  try {
    const res = await fetch(`${ROOT_ENDPOINT}/auth/user`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: auth.accessToken },
      body: JSON.stringify(body),
    })
    return await checkResponse<IUserResponse>(res)
  } catch (e) {
    //
    // RETRY
    console.log('Retry. Handling error. ', e)
    try {
      const newTokens = await fetchTokenUpdate(auth)
      //
      // RETRY OK
      console.log('Retry. Handle error successfully. ', { newTokens })
      onTokenUpdates(newTokens)
      const res = await fetch(`${ROOT_ENDPOINT}/auth/user`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: newTokens.accessToken },
        body: JSON.stringify(body),
      })
      return await checkResponse<IUserResponse>(res)
    } catch (e) {
      //
      // RETRY NOT OK
      console.log('Retry. Handling error failed. ', e)
      throw e
    }
  }
}

export const fetchIngredients = async () => {
  const res = await fetch(`${ROOT_ENDPOINT}/ingredients`)
  const payload = await checkResponse<IDataResponse<TBurgerIngredient[]>>(res)
  return payload.data
}

export const fetchOrder = async (
  body: { ingredients: string[] },
  auth: ITokens,
  onTokenUpdates: TOnTokenUpdatesCallback
) => {
  try {
    const res = await fetch(`${ROOT_ENDPOINT}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: auth.accessToken },
      body: JSON.stringify(body),
    })
    const data = await checkResponse<IOrderResponse>(res)
    return { name: data.name, number: data.order.number }
  } catch (e) {
    //
    // RETRY
    console.log('Retry. Handling error. ', e)
    try {
      const newTokens = await fetchTokenUpdate(auth)
      //
      // RETRY OK
      console.log('Retry. Handle error successfully. ', { newTokens })
      onTokenUpdates(newTokens)
      const res = await fetch(`${ROOT_ENDPOINT}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: auth.accessToken },
        body: JSON.stringify(body),
      })
      const data = await checkResponse<IOrderResponse>(res)
      return { name: data.name, number: data.order.number }
    } catch (e) {
      //
      // RETRY NOT OK
      console.log('Retry. Handling error failed. ', e)
      throw e
    }
  }
}

export const fetchLogin = async (body: IMakeLoginPayload) => {
  const res = await fetch(`${ROOT_ENDPOINT}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return checkResponse<ILoginResponse>(res)
}

export const fetchRegister = async (body: IUserPayload) => {
  const res = await fetch(`${ROOT_ENDPOINT}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return checkResponse<IUserResponse>(res)
}

export const fetchForgotPassword = async (body: ILoginPayload) => {
  const res = await fetch(`${ROOT_ENDPOINT}/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return checkResponse(res)
}

export const fetchResetPassword = async (body: IResetPasswordPayload) => {
  const res = await fetch(`${ROOT_ENDPOINT}/password-reset/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return checkResponse(res)
}

export const fetchLogout = async (body: { token: string }) => {
  console.log({ body })
  const res = await fetch(`${ROOT_ENDPOINT}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return checkResponse(res)
}
