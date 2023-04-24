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
        items.map((v, i) => (
          <BurgerElement key={v._key} item={v} index={i} setContainerHighlight={setContainerHighlight} />
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
