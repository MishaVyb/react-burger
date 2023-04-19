import PropTypes from 'prop-types'
import { useState } from 'react'

import { BurgerIngredientType } from '../../../utils/types'
import BurgerElement from '../burger-element/burger-element'
import styles from './styles.module.css'

const ElementsList = ({ items }) => {
  const [isHighlight, setContainerHighlight] = useState(false)

  return (
    <div className={`custom-scroll ${styles.container} ${isHighlight ? styles.highlight : ''}`}>
      {items.length ? (
        items.map((v, i) =>
          v ? (
            <BurgerElement key={v._id} item={v} index={i} setContainerHighlight={setContainerHighlight} />
          ) : (
            <h2 key={i}>(no el)</h2>
          )
        )
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
