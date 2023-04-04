import React from 'react'
import PropTypes from 'prop-types'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'

const CurrencyView = ({ number, size }) => {
  return (
    <div className={styles.currency}>
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
