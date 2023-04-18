import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { selectConstructorBuns, selectConstructorItems } from '../../../services/constructor/selectors'
import { BurgerIngredientType } from '../../../utils/types'
import BurgerElement from '../burger-element/burger-element'
import ElementsList from '../elements-list/elements-list'
import ElementsTotal from '../elements-total/elements-total'
import styles from './styles.module.css'

const BurgerConstructor = () => {
  // TODO to selectors
  const bun = useSelector(selectConstructorBuns)
  const items = useSelector(selectConstructorItems)

  return (
    <div className={`pt-25 pb-10 pl-4 pr-4 custom-scroll ${styles.container}`}>
      <BurgerElement item={bun} arrangement='top' blank={!bun} />
      <ElementsList items={items} />
      <BurgerElement item={bun} arrangement='bottom' blank={!bun} />
      <ElementsTotal />
    </div>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(BurgerIngredientType.isRequired).isRequired,
}

export default BurgerConstructor
