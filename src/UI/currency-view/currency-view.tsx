import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { FC } from 'react'

import styles from './styles.module.css'

interface ICurrencyViewProps {
  number: number
  className?: string
  size?: 'default' | 'medium' | 'large'
}

const CurrencyView: FC<ICurrencyViewProps> = ({ number, className = '', size = 'default' }) => {
  return (
    <div className={cn(styles.container, className)}>
      <p className={`text text_type_digits-${size} mr-2`}>{number}</p>
      <CurrencyIcon type='primary' />
    </div>
  )
}

export default CurrencyView
