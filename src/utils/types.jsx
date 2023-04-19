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
})

export const DragTypes = {
  BUN: 'BUN',
  FILLINGS: 'FILLINGS', // includes `sauce` and `main` ingredients (начинки)
  FILLINGS_CONSTRUCTOR: 'FILLINGS_CONSTRUCTOR', // sortable fillings

  forItem(item) {
    return item.type === 'bun' ? DragTypes.BUN : DragTypes.FILLINGS
  },
  forArrangement(arrangement) {
    return arrangement === 'top' || arrangement === 'bottom' ? DragTypes.BUN : DragTypes.FILLINGS
  },
}
