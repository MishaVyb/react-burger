const ROOT_ENDPOINT = 'https://norma.nomoreparties.space/api'

const checkResponse = (res) => (res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))

const fetchTokenUpdate = (auth) => {
  console.log('--> fetchTokenUpdate')

  return fetch(`${ROOT_ENDPOINT}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: auth.refreshToken }),
  }).then(checkResponse)
}

export const fetchUser = (auth, onTokenUpdates) => {
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
            headers: { Authorization: `${json.accessToken}` },
          }).then(checkResponse)
        })
        .catch((e) => {
          //
          // RETRY NOT OK
          console.error('Retry. Handling error failed. ', e)
          return Promise.reject(e)
        })
    })
}

export const fetchUserUpdate = (body) => {
  return fetch(`${ROOT_ENDPOINT}/auth/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(checkResponse)
}

export const fetchIngredients = () => {
  return fetch(`${ROOT_ENDPOINT}/ingredients`).then(checkResponse)
}

export const fetchOrder = (body) => {
  return fetch(`${ROOT_ENDPOINT}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(checkResponse)
}

export const fetchLogin = (body) => {
  return fetch(`${ROOT_ENDPOINT}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(checkResponse)
}

export const fetchRegister = (body) => {
  return fetch(`${ROOT_ENDPOINT}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(checkResponse)
}

export const fetchForgotPassword = (body) => {
  return fetch(`${ROOT_ENDPOINT}/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(checkResponse)
}

export const fetchResetPassword = (body) => {
  return fetch(`${ROOT_ENDPOINT}/password-reset/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(checkResponse)
}

export const fetchLogout = (body) => {
  return fetch(`${ROOT_ENDPOINT}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(checkResponse)
}
