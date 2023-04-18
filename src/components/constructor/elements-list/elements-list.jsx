import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { selectConstructorHoveredItemIndex } from '../../../services/constructor/selectors'
import { BurgerIngredientType } from '../../../utils/types'
import BurgerElement from '../burger-element/burger-element'
import styles from './styles.module.css'

const ElementsList = ({ items }) => {
  const hoveredItemIndex = useSelector(selectConstructorHoveredItemIndex)

  return (
    <div className={`custom-scroll ${styles.container}`}>
      {items.length ? (
        items.map((v, i) => (
          <>
            <BurgerElement key={v._id} item={v} index={i} />
            {
              // NOTE: render Blank Element under Burger Element if it is hovered
              hoveredItemIndex === i ? <BurgerElement /> : null
            }
          </>
        ))
      ) : (
        // NOTE: render Blank Element for empty array
        <BurgerElement />
      )}
    </div>
  )
}

ElementsList.propTypes = {
  items: PropTypes.arrayOf(BurgerIngredientType).isRequired,
}

export default ElementsList
