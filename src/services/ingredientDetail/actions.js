export const SET_CURRENT_INGREDIENT_DETAIL = 'SET_CURRENT_INGREDIENT_DETAIL'
export const UNSET_CURRENT_INGREDIENT_DETAIL = 'UNSET_CURRENT_INGREDIENT_DETAIL'

export const setCurrentIngredientDetail = (item) => ({ type: SET_CURRENT_INGREDIENT_DETAIL, payload: { item } })
export const unsetCurrentIngredientDetail = () => ({ type: UNSET_CURRENT_INGREDIENT_DETAIL })
