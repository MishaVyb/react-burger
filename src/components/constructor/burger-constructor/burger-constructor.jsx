import PropTypes from 'prop-types'

import BurgerIngredientType from '../../../utils/types'
import BurgerElement from '../burger-element/burger-element'
import ElementsList from '../elements-list/elements-list'
import ElementsTotal from '../elements-total/elements-total'
import styles from './styles.module.css'

const BurgerConstructor = ({ ingredients }) => {
  if (!ingredients.length) {
    return <></>
  }

  const topItem = ingredients.at(0)
  const bottomItem = ingredients.at(-1)
  const middleItems = ingredients.slice(1, -1)

  return (
    <div className={`pt-25 pb-10 pl-4 pr-4 custom-scroll ${styles.container}`}>
      <BurgerElement item={topItem} arrangement='top' />
      <ElementsList items={middleItems} />
      <BurgerElement item={bottomItem} arrangement='bottom' />
      <ElementsTotal />
    </div>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(BurgerIngredientType),
}

export default BurgerConstructor
