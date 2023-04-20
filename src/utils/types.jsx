import PropTypes from 'prop-types'

export const BurgerIngredientType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['main', 'bun', 'sauce']).isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,

  // Custom fields:
  counter: PropTypes.number,
})

export const IngredientTypes = {
  BUN: 'bun',
  SAUCE: 'sauce',
  MAIN: 'main',
}

export const DragTypes = {
  BUN: 'BUN',

  // Filling: начинки. Includes `sauce` and `main` ingredients.
  FILLINGS: 'FILLINGS',

  // Sortable Fillings.
  FILLINGS_CONSTRUCTOR: 'FILLINGS_CONSTRUCTOR',

  forItem(item) {
    return item.type === IngredientTypes.BUN ? DragTypes.BUN : DragTypes.FILLINGS
  },
  forArrangement(arrangement) {
    return arrangement === 'top' || arrangement === 'bottom' ? DragTypes.BUN : DragTypes.FILLINGS
  },
}
