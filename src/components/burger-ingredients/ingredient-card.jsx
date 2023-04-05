import React from 'react'
import PropTypes from 'prop-types'
import CurrencyView from '../../UI/currency-view'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
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

const BurgerIngredientType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
})

IngredientCard.propTypes = {
  item: BurgerIngredientType.isRequired,
  count: PropTypes.number,
}

export { IngredientCard, BurgerIngredientType }
