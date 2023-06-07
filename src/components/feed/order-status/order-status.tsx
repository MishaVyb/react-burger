import cn from 'classnames'
import { FC } from 'react'

import { FeedOrderStatus, FeedOrderStatusVerbose } from '../../../services/feed/reducer'
import styles from './styles.module.css'

const OrderStatus: FC<{ status: FeedOrderStatus }> = ({ status }) => {
  return (
    <p
      className={cn('text text_type_main-default mt-3', styles.align_left, {
        text_color_success: status === FeedOrderStatus.done,
        text_color_accent: status === FeedOrderStatus.pending,
        text_color_inactive: status === FeedOrderStatus.created,
      })}
    >
      {FeedOrderStatusVerbose[status]}
    </p>
  )
}

export default OrderStatus
