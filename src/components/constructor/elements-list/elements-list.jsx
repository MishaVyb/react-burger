import PropTypes from 'prop-types'

import BurgerIngredientType from '../../../utils/types'
import BurgerElement from '../burger-element/burger-element'
import styles from './styles.module.css'

const ElementsList = ({ items }) => {
  return (
    <div className={`custom-scroll ${styles.container}`}>
      {items.map((v) => (
        <BurgerElement key={v._id} item={v} />
      ))}
    </div>
  )
}

ElementsList.propTypes = {
  items: PropTypes.arrayOf(BurgerIngredientType.isRequired).isRequired,
}

export default ElementsList
