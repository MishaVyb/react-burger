import {
  ILoginPayload,
  IMakeLoginPayload,
  IResetPasswordPayload,
  ITokens,
  IUserPayload,
} from '../services/auth/actions'

const ROOT_ENDPOINT = 'https://norma.nomoreparties.space/api'

type TOnTokenUpdatesCallback = (newTokens: ITokens) => void

const checkResponse = (res: Response) => (res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))

const fetchTokenUpdate = (auth: ITokens) => {
  if (!auth.refreshToken) throw Error('No refresh token. Please, login again. ')

  return fetch(`${ROOT_ENDPOINT}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: auth.refreshToken }),
  }).then(checkResponse)
}

export const fetchUser = (auth: ITokens, onTokenUpdates: TOnTokenUpdatesCallback) => {
  if (!auth.accessToken) throw Error('No access token. Please, login again. ')

  return fetch(`${ROOT_ENDPOINT}/auth/user`, {
    method: 'GET',
    headers: { Authorization: auth.accessToken },
  })
    .then(checkResponse)
    .catch((e) => {
      //
      // RETRY
      console.log('Retry. Handling error. ', e)
      return fetchTokenUpdate(auth)
        .then((json) => {
          //
          // RETRY OK
          console.log('Retry. Handle error successfully. ', json)
          onTokenUpdates(json)
          return fetch(`${ROOT_ENDPOINT}/auth/user`, {
            method: 'GET',
            headers: { Authorization: json.accessToken },
          }).then(checkResponse)
        })
        .catch((e) => {
          //
          // RETRY NOT OK
          console.log('Retry. Handling error failed. ', e)
          return Promise.reject(e)
        })
    })
}

export const fetchUpdateUser = (body: IUserPayload, auth: ITokens, onTokenUpdates: TOnTokenUpdatesCallback) => {
  return fetch(`${ROOT_ENDPOINT}/auth/user`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: auth.accessToken },
    body: JSON.stringify(body),
  })
    .then(checkResponse)
    .catch((e) => {
      //
      // RETRY
      console.log('Retry. Handling error. ', e)
      return fetchTokenUpdate(auth)
        .then((json) => {
          //
          // RETRY OK
          console.log('Retry. Handle error successfully. ', json)
          onTokenUpdates(json)
          return fetch(`${ROOT_ENDPOINT}/auth/user`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: json.accessToken },
            body: JSON.stringify(body),
          }).then(checkResponse)
        })
        .catch((e) => {
          //
          // RETRY NOT OK
          console.log('Retry. Handling error failed. ', e)
          return Promise.reject(e)
        })
    })
}

export const fetchIngredients = () => {
  return fetch(`${ROOT_ENDPOINT}/ingredients`).then(checkResponse)
}

export const fetchOrder = (body: { ingredients: string[] }) => {
  return fetch(`${ROOT_ENDPOINT}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(checkResponse)
}

export const fetchLogin = (body: IMakeLoginPayload) => {
  return fetch(`${ROOT_ENDPOINT}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(checkResponse)
}

export const fetchRegister = (body: IUserPayload) => {
  return fetch(`${ROOT_ENDPOINT}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(checkResponse)
}

export const fetchForgotPassword = (body: ILoginPayload) => {
  return fetch(`${ROOT_ENDPOINT}/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(checkResponse)
}

export const fetchResetPassword = (body: IResetPasswordPayload) => {
  return fetch(`${ROOT_ENDPOINT}/password-reset/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(checkResponse)
}

export const fetchLogout = (body: { token: string }) => {
  return fetch(`${ROOT_ENDPOINT}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(checkResponse)
}
