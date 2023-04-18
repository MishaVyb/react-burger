import { LOAD_INGREDIENTS_ERROR, LOAD_INGREDIENTS_REQUEST, LOAD_INGREDIENTS_SUCCESS } from '../ingredients/actions'

const defaultBun = {
  _id: null,
  name: '',
  type: 'bun',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
}
const defaultIngredient = {
  _id: null,
  name: '',
  type: 'main',
  image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
}

const initialStore = {
  // bun: defaultBun,
  // items: [defaultIngredient],
  bun: null,
  items: [],
}

export const reducer = (store = initialStore, action) => {
  return store
  // switch (action.type) {
  // case '':
  //   return {
  //     ...store,
  //   }

  // default:
  //   return store
  // }
}
