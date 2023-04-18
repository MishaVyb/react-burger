const ROOT_ENDPOINT = 'https://norma.nomoreparties.space/api'

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(`Response is not OK. Reason: ${err}`))
}

const fetchIngredients = () => {
  return fetch(`${ROOT_ENDPOINT}/ingredients`)
    .then(checkResponse)
    .then((json) => json.data)
  //.then((result) => ({ data: result.data, loading: false, error: null }))
  //.catch((err) => ({ data: [], loading: false, hasError: true, errorDetail: err }))
}

export default fetchIngredients
