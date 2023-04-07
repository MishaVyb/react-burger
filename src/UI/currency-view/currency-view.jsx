import React from 'react'
import PropTypes from 'prop-types'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'

const CurrencyView = ({ number, size }) => {
  return (
    <div className={styles.container}>
      <p className={`text text_type_digits-${size} mr-2`}>{number}</p>
      <CurrencyIcon type='primary' />
    </div>
  )
}

CurrencyView.propTypes = {
  number: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['default', 'medium', 'large']),
}

CurrencyView.defaultProps = {
  size: 'default',
}

export default CurrencyView
