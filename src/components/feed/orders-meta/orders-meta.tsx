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
        {/* DONE ORDERS */}
        <div className={cn('mr-15')}>
          <p className='text text_type_main-medium mb-4'>Готовы:</p>
          <div className={cn(styles.container_statuses)}>
            {doneOrders.map((chunk, chunkIndex) => {
              return (
                <div key={chunkIndex} className='mr-5'>
                  {chunk.map((order, orderIndex) => (
                    <p key={order.number} className='text text_type_digits-default text_color_success mt-1'>
                      {order.number}
                    </p>
                  ))}
                </div>
              )
            })}
          </div>
        </div>

        {/* PENDING ORDERS */}
        <div className={cn('mr-15', styles.shrink)}>
          <p className='text text_type_main-medium mb-4'>В работе:</p>
          <div className={cn(styles.container_statuses)}>
            {pendingOrders.map((chunk, chunkIndex) => {
              return (
                <div key={chunkIndex} className='mr-5'>
                  {chunk.map((order, orderIndex) => (
                    <p key={order.number} className='text text_type_digits-default mt-1'>
                      {order.number}
                    </p>
                  ))}
                </div>
              )
            })}
          </div>
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
