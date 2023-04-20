import { LOAD_ORDER_ERROR, LOAD_ORDER_REQUEST, LOAD_ORDER_SUCCESS } from './actions'

const initialStore = {
  name: [],
  number: null,
  error: null,
  pendingRequest: false,
}

export const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case LOAD_ORDER_REQUEST:
      return {
        ...store,
        pendingRequest: true,
      }
    case LOAD_ORDER_ERROR:
      return {
        ...initialStore,
        error: action.payload,
      }
    case LOAD_ORDER_SUCCESS:
      return {
        ...store,
        name: action.payload.name,
        number: action.payload.order.number,
        error: null,
        pendingRequest: false,
      }

    default:
      return store
  }
}
