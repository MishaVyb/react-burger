import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

import CurrencyView from '../../../UI/currency-view/currency-view'
import BurgerIngredientType from '../../../utils/types'
import styles from './styles.module.css'

const IngredientCard = ({ item, count }) => {
  return (
    <div className={`m-3 ${styles.card}`}>
      {count ? <Counter count={count} size='default' extraClass='m-1' /> : null}
      <img className='ml-2 mr-2' src={item.image} alt='' />
      <CurrencyView number={item.price} />
      <p className={`text text_type_main-small mt-1 mb-4 ${styles.align}`}>{item.name}</p>
    </div>
  )
}

IngredientCard.propTypes = {
  item: BurgerIngredientType,
  count: PropTypes.number,
}

export default IngredientCard
