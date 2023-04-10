const ROOT_ENDPOINT = 'https://norma.nomoreparties.space/api'

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

const fetchIngredients = (setResultCallback) => {
  return fetch(`${ROOT_ENDPOINT}/ingredients`)
    .then(checkResponse)
    .then((result) => setResultCallback({ data: result.data, loading: false, hasError: false }))
    .catch((err) => setResultCallback({ data: [], loading: false, hasError: true, errorDetail: err }))
}

export default fetchIngredients
