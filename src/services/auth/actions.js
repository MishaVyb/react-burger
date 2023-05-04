import {
  fetchForgotPassword,
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchResetPassword,
  fetchUpdateUser,
  fetchUser,
} from '../../utils/burger-api'
import { selectAuth, selectRefreshToken } from './selectors'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_ERROR = 'LOAD_USER_ERROR'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'

export const LOAD_USER_UPDATE_REQUEST = 'LOAD_USER_UPDATE_REQUEST'
export const LOAD_USER_UPDATE_ERROR = 'LOAD_USER_UPDATE_ERROR'
export const LOAD_USER_UPDATE_SUCCESS = 'LOAD_USER_UPDATE_SUCCESS'

export const LOAD_LOGIN_REQUEST = 'LOAD_LOGIN_REQUEST'
export const LOAD_LOGIN_ERROR = 'LOAD_LOGIN_ERROR'
export const LOAD_LOGIN_SUCCESS = 'LOAD_LOGIN_SUCCESS'

export const LOAD_REGISTER_REQUEST = 'LOAD_REGISTER_REQUEST'
export const LOAD_REGISTER_ERROR = 'LOAD_REGISTER_ERROR'
export const LOAD_REGISTER_SUCCESS = 'LOAD_REGISTER_SUCCESS'

export const LOAD_FORGOT_PASSWORD_REQUEST = 'LOAD_FORGOT_PASSWORD_REQUEST'
export const LOAD_FORGOT_PASSWORD_ERROR = 'LOAD_FORGOT_PASSWORD_ERROR'
export const LOAD_FORGOT_PASSWORD_SUCCESS = 'LOAD_FORGOT_PASSWORD_SUCCESS'

export const LOAD_RESET_PASSWORD_REQUEST = 'LOAD_RESET_PASSWORD_REQUEST'
export const LOAD_RESET_PASSWORD_ERROR = 'LOAD_RESET_PASSWORD_ERROR'
export const LOAD_RESET_PASSWORD_SUCCESS = 'LOAD_RESET_PASSWORD_SUCCESS'

export const LOAD_LOGOUT_REQUEST = 'LOAD_LOGOUT_REQUEST'
export const LOAD_LOGOUT_ERROR = 'LOAD_LOGOUT_ERROR'
export const LOAD_LOGOUT_SUCCESS = 'LOAD_LOGOUT_SUCCESS'

export const UPDATE_TOKENS = 'UPDATE_TOKENS'

export const RESET_REQUEST_STATUS = 'RESET_REQUEST_STATUS'
export const resetRequestStatus = () => ({ type: RESET_REQUEST_STATUS })

export const loadUser = () => (dispatch, getState) => {
  dispatch({
    type: LOAD_USER_REQUEST,
  })

  fetchUser(selectAuth(getState()), (newTokens) => dispatch({ type: UPDATE_TOKENS, payload: newTokens }))
    .then((json) => {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: json,
      })
    })
    .catch((err) => {
      dispatch({
        type: LOAD_USER_ERROR,
        payload: err,
      })
    })
}

export const updateUser = (data) => (dispatch, getState) => {
  dispatch({
    type: LOAD_USER_UPDATE_REQUEST,
  })

  fetchUpdateUser(data, selectAuth(getState()), (newTokens) => dispatch({ type: UPDATE_TOKENS, payload: newTokens }))
    .then((json) => {
      dispatch({
        type: LOAD_USER_UPDATE_SUCCESS,
        payload: json,
      })
    })
    .catch((err) => {
      dispatch({
        type: LOAD_USER_UPDATE_ERROR,
        payload: err,
      })
    })
}

export const loadLogin = (data) => (dispatch) => {
  dispatch({
    type: LOAD_LOGIN_REQUEST,
  })

  fetchLogin(data)
    .then((json) =>
      dispatch({
        type: LOAD_LOGIN_SUCCESS,
        payload: json,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOAD_LOGIN_ERROR,
        payload: err,
      })
    )
}

export const loadRegister = (data) => (dispatch) => {
  dispatch({
    type: LOAD_REGISTER_REQUEST,
  })

  fetchRegister(data)
    .then((json) =>
      dispatch({
        type: LOAD_REGISTER_SUCCESS,
        payload: json,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOAD_REGISTER_ERROR,
        payload: err,
      })
    )
}

export const loadForgotPassword = (data) => (dispatch) => {
  dispatch({
    type: LOAD_FORGOT_PASSWORD_REQUEST,
  })

  fetchForgotPassword(data)
    .then((json) =>
      dispatch({
        type: LOAD_FORGOT_PASSWORD_SUCCESS,
        payload: json,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOAD_FORGOT_PASSWORD_ERROR,
        payload: err,
      })
    )
}

export const loadResetPassword = (data) => (dispatch) => {
  dispatch({
    type: LOAD_RESET_PASSWORD_REQUEST,
  })

  fetchResetPassword(data)
    .then((json) =>
      dispatch({
        type: LOAD_RESET_PASSWORD_SUCCESS,
        payload: json,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOAD_RESET_PASSWORD_ERROR,
        payload: err,
      })
    )
}

export const loadLogout = () => (dispatch, getState) => {
  dispatch({
    type: LOAD_LOGOUT_REQUEST,
  })

  const token = selectRefreshToken(getState())
  fetchLogout({ token })
    .then((json) =>
      dispatch({
        type: LOAD_LOGOUT_SUCCESS,
        payload: json,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOAD_LOGOUT_ERROR,
        payload: err,
      })
    )
}
