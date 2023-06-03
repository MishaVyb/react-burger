import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'

import styles from './styles.module.css'

interface ICurrencyViewProps {
  number: number
  size?: 'default' | 'medium' | 'large'
}

const CurrencyView: FC<ICurrencyViewProps> = ({ number, size }) => {
  return (
    <div className={styles.container}>
      <p className={`text text_type_digits-${size} mr-2`}>{number}</p>
      <CurrencyIcon type='primary' />
    </div>
  )
}

CurrencyView.defaultProps = {
  size: 'default',
}

export default CurrencyView
