import React from 'react'
import PropTypes from 'prop-types'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const CurrencyView = ({ number, size }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <p className={`text text_type_digits-${size} mr-2`}>{number}</p>
      <CurrencyIcon type='primary' />
    </div>
  )
}

CurrencyView.propTypes = {}

CurrencyView.defaultProps = {
  size: 'default',
}

export default CurrencyView
