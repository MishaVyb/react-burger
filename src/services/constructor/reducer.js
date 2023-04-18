import { ADD_CONSTRUCTOR_ITEM, MOVE_CONSTRUCTOR_ITEM, SET_HOVERED_ITEM_INDEX } from './actions'

const initialStore = {
  bun: null,
  items: [],
  hoveredItemIndex: null, // index for element hovered by dragged ingredient
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
        items: store.items.toSpliced(action.payload.index + 1, 0, action.payload.item),
      }
    case MOVE_CONSTRUCTOR_ITEM:
      return {
        ...store,
        items: store.items
          .toSpliced(action.payload.dragIndex, 1) // removing what we are dragging
          .toSpliced(action.payload.hoverIndex, 0, store.items[action.payload.dragIndex]), // inserting it into hoverIndex
      }
    case SET_HOVERED_ITEM_INDEX:
      return {
        ...store,
        hoveredItemIndex: action.payload,
      }

    default:
      return store
  }
}
