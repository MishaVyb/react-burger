import { ADD_CONSTRUCTOR_ITEM, REMOVE_CONSTRUCTOR_ITEM } from '../constructor/actions'
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

    case ADD_CONSTRUCTOR_ITEM:
      if (action.payload.item.type === 'bun') {
        return {
          ...store,
          items: store.items.map((v) => {
            if (v._id === action.payload.item._id) {
              return { ...v, counter: 2 }
            }
            return { ...v, counter: 0 }
          }),
        }
      }
      return {
        ...store,
        items: store.items.map((v) => {
          if (v._id === action.payload.item._id) {
            return { ...v, counter: v.counter ? v.counter + 1 : 1 }
          }
          return v
        }),
      }
    case REMOVE_CONSTRUCTOR_ITEM:
      return {
        ...store,
        items: store.items.map((v) => {
          if (v._id === action.payload.item._id) {
            return { ...v, counter: v.counter - 1 }
          }
          return v
        }),
      }

    default:
      return store
  }
}
