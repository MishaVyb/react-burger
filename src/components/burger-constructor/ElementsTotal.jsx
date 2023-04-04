import React from 'react'
import PropTypes from 'prop-types'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import CurrencyView from '../../UI/CurrencyView'

// TODO raname: ConstructorTotal
const ElementsTotal = (props) => {
  const total = 610

  return (
    <div
      className='mt-10'
      style={{
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <Button>Оформить заказ</Button>
      <CurrencyView number={total} size='medium' />
    </div>
  )
}

ElementsTotal.propTypes = {}

export default ElementsTotal
