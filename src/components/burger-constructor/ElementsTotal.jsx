import React from 'react'
import PropTypes from 'prop-types'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import CurrencyView from '../../UI/CurrencyView'
import styles from './styles.module.css'

// TODO rename: ConstructorTotal
const ElementsTotal = () => {
  const total = 610

  return (
    <div className={`mt-10 ${styles.total}`}>
      <Button extraClass='ml-5'>Оформить заказ</Button>
      <CurrencyView number={total} size='medium' />
    </div>
  )
}

ElementsTotal.propTypes = {}

export default ElementsTotal
