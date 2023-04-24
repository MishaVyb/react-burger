const ROOT_ENDPOINT = 'https://norma.nomoreparties.space/api'

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export const fetchIngredients = () => {
  return fetch(`${ROOT_ENDPOINT}/ingredients`).then(checkResponse)
}

export const fetchOrder = (body) => {
  return fetch(`${ROOT_ENDPOINT}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(checkResponse)
}
