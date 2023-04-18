import { ADD_CONSTRUCTOR_ITEM } from './actions'

const initialStore = {
  bun: null,
  items: [],
}

export const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_ITEM:
      if (action.payload.item.type === 'bun') {
        return {
          ...store,
          bun: action.payload.item,
        }
      }
      return {
        ...store,
        items: store.items.toSpliced(action.payload.index, 0, action.payload.item),
      }

    default:
      return store
  }
}
