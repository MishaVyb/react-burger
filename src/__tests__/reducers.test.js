import { loadLogin, loadLogout } from '../services/auth/actions'
import constructorReducer, {
  addConstructorBun,
  addConstructorFilling,
  moveConstructorItem,
  removeConstructorItem,
} from '../services/constructor/reducer'
import ingredientReducer from '../services/ingredients/reducer'
import { loadOrder } from '../services/order/actions'
import { store } from '../services/store'
import { loadFromLocalStorage } from '../utils/persistence'

const bunIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
}

const mainIngredient = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0,
}

const sauceIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0,
}

describe('test ingredientReducer', () => {
  let state = {
    items: [bunIngredient, mainIngredient, sauceIngredient],
    error: null,
    pendingRequest: false,
  }

  it('should be count taken/removed ingredients right', () => {
    // Add BUN and SAUCE
    state = ingredientReducer(state, addConstructorBun(bunIngredient))
    state = ingredientReducer(state, addConstructorFilling({ item: sauceIngredient }))

    const [bun, main, sauce] = state.items
    expect(bun.counter).toEqual(2) // reducer add 2 BUNs always by default
    expect(main.counter).toEqual(0) // we do not add MAIN ingredient
    expect(sauce.counter).toEqual(1) // but add 1 SAUCE

    // Remove SAUCE and check counter equals 0
    state = ingredientReducer(state, removeConstructorItem({ item: sauceIngredient }))
    expect(state.items[2].counter).toEqual(0)
  })
})

describe('test constructorReducer', () => {
  let state = {
    bun: null,
    items: [],
    movingItemIndex: null,
  }

  it('should take and remove ingredients right', () => {
    state = constructorReducer(state, addConstructorBun(bunIngredient))
    expect(state.bun).toEqual(bunIngredient)

    state = constructorReducer(state, addConstructorFilling({ item: sauceIngredient, index: 0 }))
    state = constructorReducer(state, addConstructorFilling({ item: mainIngredient, index: 0 }))

    // We add SAUCE first, but it will be last, as after it we push MAIN left with index 0
    expect(state.items).toEqual([mainIngredient, sauceIngredient])

    // Add another MAIN and remove it after - check that removes the only one (not both MAINs)
    state = constructorReducer(state, addConstructorFilling({ item: mainIngredient, index: 0 }))
    state = constructorReducer(state, removeConstructorItem({ item: mainIngredient, index: 0 }))
    expect(state.items).toEqual([mainIngredient, sauceIngredient])

    // Move it (as it sortable)
    state = constructorReducer(state, moveConstructorItem({ dragIndex: 0, hoverIndex: 1 }))
    expect(state.items).toEqual([sauceIngredient, mainIngredient])
  })
})

describe('test authReducer with AsyncThunk', () => {
  const AUTH_RESPONSE = {
    result: 'ok',
    user: { email: 'email', password: 'password' },
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  }
  const initialState = {
    user: { name: '', email: '' },
    accessToken: '',
    refreshToken: '',
    error: undefined,
    pendingRequest: false,
  }

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockReturnValueOnce(AUTH_RESPONSE),
      ok: true,
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should fetch login and save it to local storage on login and remove it on logout', async () => {
    await store.dispatch(loadLogin({ email: 'email', password: 'password' }))
    expect(store.getState().auth).toEqual({ ...initialState, ...AUTH_RESPONSE })
    expect(loadFromLocalStorage('auth')).toEqual({ ...initialState, ...AUTH_RESPONSE })

    await store.dispatch(loadLogout())
    expect(store.getState().auth).toEqual(initialState)
    expect(loadFromLocalStorage('auth')).toEqual(undefined)
  })
})

describe('test orderReducer with AsyncThunk', () => {
  const ORDER_RESPONSE = {
    result: 'ok',
    name: 'name',
    order: { number: 123 },
  }
  const initialState = {
    name: null,
    number: null,
    error: null,
    pendingRequest: false,
  }

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockReturnValueOnce(ORDER_RESPONSE),
      ok: true,
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should fetch order', async () => {
    await store.dispatch(loadOrder({ items: [mainIngredient, sauceIngredient], bun: bunIngredient }))
    expect(store.getState().order).toEqual({
      ...initialState,
      ...{ number: ORDER_RESPONSE.order.number, name: ORDER_RESPONSE.name },
    })
  })
})
