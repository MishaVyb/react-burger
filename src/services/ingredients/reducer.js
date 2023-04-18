import { LOAD_INGREDIENTS_ERROR, LOAD_INGREDIENTS_REQUEST, LOAD_INGREDIENTS_SUCCESS } from './actions'

const initialStore = {
  items: [],
  error: null,
  pendingRequest: false,
}

export const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case LOAD_INGREDIENTS_REQUEST:
      return {
        ...store,
        pendingRequest: true,
      }
    case LOAD_INGREDIENTS_ERROR:
      return {
        ...store,
        pendingRequest: false,
        error: action.payload,
      }
    case LOAD_INGREDIENTS_SUCCESS:
      return {
        ...store,
        items: action.payload,
        error: null,
        pendingRequest: false,
      }

    default:
      return store
  }
}
