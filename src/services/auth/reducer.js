import { removeFromLocalStorage, saveToLocalStorage } from '../../utils/persistence'
import {
  LOAD_FORGOT_PASSWORD_ERROR,
  LOAD_FORGOT_PASSWORD_REQUEST,
  LOAD_FORGOT_PASSWORD_SUCCESS,
  LOAD_LOGIN_ERROR,
  LOAD_LOGIN_REQUEST,
  LOAD_LOGIN_SUCCESS,
  LOAD_LOGOUT_ERROR,
  LOAD_LOGOUT_REQUEST,
  LOAD_LOGOUT_SUCCESS,
  LOAD_REGISTER_ERROR,
  LOAD_REGISTER_REQUEST,
  LOAD_REGISTER_SUCCESS,
  LOAD_RESET_PASSWORD_ERROR,
  LOAD_RESET_PASSWORD_REQUEST,
  LOAD_RESET_PASSWORD_SUCCESS,
  LOAD_USER_ERROR,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_UPDATE_ERROR,
  LOAD_USER_UPDATE_REQUEST,
  LOAD_USER_UPDATE_SUCCESS,
  RESET_REQUEST_STATUS,
  UPDATE_TOKENS,
} from './actions'

const initialStore = {
  user: {
    email: null,
    name: null,
  },
  accessToken: null,
  refreshToken: null,

  error: null,
  pendingRequest: false,
}

export const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
    case LOAD_USER_UPDATE_REQUEST:
    case LOAD_LOGIN_REQUEST:
    case LOAD_REGISTER_REQUEST:
    case LOAD_FORGOT_PASSWORD_REQUEST:
    case LOAD_RESET_PASSWORD_REQUEST:
    case LOAD_LOGOUT_REQUEST:
      return {
        ...store,
        pendingRequest: true,
      }

    case LOAD_USER_ERROR:
    case LOAD_LOGIN_ERROR:
    case LOAD_REGISTER_ERROR:
    case LOAD_FORGOT_PASSWORD_ERROR:
    case LOAD_RESET_PASSWORD_ERROR:
    case LOAD_LOGOUT_ERROR:
      removeFromLocalStorage('auth')
      return {
        ...initialStore,
        error: action.payload?.message || JSON.stringify(action.payload),
      }

    case LOAD_USER_UPDATE_ERROR:
      return {
        ...store,
        pendingRequest: false,
        error: action.payload?.message || JSON.stringify(action.payload),
      }

    case LOAD_USER_SUCCESS:
    case LOAD_USER_UPDATE_SUCCESS:
    case LOAD_LOGIN_SUCCESS:
    case LOAD_REGISTER_SUCCESS:
    case UPDATE_TOKENS:
      return saveToLocalStorage('auth', {
        ...store,
        ...action.payload,
        error: null,
        pendingRequest: false,
      })

    case LOAD_LOGOUT_SUCCESS:
      removeFromLocalStorage('auth')
      return initialStore

    case LOAD_FORGOT_PASSWORD_SUCCESS:
    case LOAD_RESET_PASSWORD_SUCCESS:
    case RESET_REQUEST_STATUS:
      return {
        ...store,
        pendingRequest: false,
        error: null,
      }

    default:
      return store
  }
}
