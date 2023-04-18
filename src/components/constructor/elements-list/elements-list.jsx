import PropTypes from 'prop-types'

import BurgerIngredientType from '../../../utils/types'
import BurgerElement from '../burger-element/burger-element'
import styles from './styles.module.css'

const ElementsList = ({ items }) => {
  return (
    <div className={`custom-scroll ${styles.container}`}>
      {items.length ? items.map((v) => <BurgerElement key={v._id} item={v} />) : <BurgerElement item={null} />}
    </div>
  )
}

ElementsList.propTypes = {
  items: PropTypes.arrayOf(BurgerIngredientType).isRequired,
}

export default ElementsList
