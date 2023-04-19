import { ADD_CONSTRUCTOR_ITEM, MOVE_CONSTRUCTOR_ITEM, REMOVE_CONSTRUCTOR_ITEM, SET_MOVING_ITEM_INDEX } from './actions'

const initialStore = {
  bun: null,
  items: [],
  movingItemIndex: null, // index for element which is moving (dragging) inside burger-constructor
}

export const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_ITEM:
      if (action.payload.item.type === 'bun') {
        if (action.payload.index) {
          throw Error('Index insert for Bun is not allowed. ')
        }
        return {
          ...store,
          bun: action.payload.item,
        }
      }
      return {
        ...store,
        items: store.items.toSpliced(action.payload.index, 0, { ...action.payload.item, _key: crypto.randomUUID() }),
      }
    case REMOVE_CONSTRUCTOR_ITEM:
      if (action.payload.item.type === 'bun') {
        throw Error('Not Allowed')
      }
      return {
        ...store,
        items: store.items.toSpliced(action.payload.index, 1),
      }
    case MOVE_CONSTRUCTOR_ITEM:
      return {
        ...store,
        items: store.items
          .toSpliced(action.payload.dragIndex, 1) // removing what we are dragging
          .toSpliced(action.payload.hoverIndex, 0, store.items[action.payload.dragIndex]), // inserting it into hoverIndex
      }
    case SET_MOVING_ITEM_INDEX:
      return {
        ...store,
        movingItemIndex: action.payload.index,
      }

    default:
      return store
  }
}
