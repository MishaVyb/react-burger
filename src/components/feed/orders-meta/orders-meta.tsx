import cn from 'classnames'
import { FC } from 'react'

import { useSelector } from '../../../hooks/redux'
import { selectDoneOrders, selectFeedTotal, selectPendingOrders } from '../../../services/feed/reducer'
import styles from './styles.module.css'

const OrdersMeta: FC = () => {
  const { total, totalToday } = useSelector(selectFeedTotal)
  const doneOrders = useSelector(selectDoneOrders())
  const pendingOrders = useSelector(selectPendingOrders())

  return (
    <div className={cn(styles.container, 'ml-15')}>
      <div className={cn(styles.container_statuses)}>
        <div className={cn('mr-25')}>
          <p className='text text_type_main-medium mb-4'>Готовы:</p>
          {doneOrders.map((v) => (
            <p key={v.number} className='text text_type_digits-default text_color_success mt-1'>
              {v.number}
            </p>
          ))}
        </div>

        <div>
          <p className='text text_type_main-medium mb-6'>В работе:</p>
          {pendingOrders.map((v) => (
            <p key={v.number} className='text text_type_digits-default mt-1'>
              {v.number}
            </p>
          ))}
        </div>
      </div>

      <p className='text text_type_main-medium mt-15'>Выполнено за все время:</p>
      <p className='text text_type_digits-large'>{total}</p>
      <p className='text text_type_main-medium mt-15'>Выполнено за сегодня:</p>
      <p className='text text_type_digits-large'>{totalToday}</p>
    </div>
  )
}

export default OrdersMeta
