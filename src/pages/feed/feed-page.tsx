import cn from 'classnames'
import { FC } from 'react'

import OrdersList from '../../components/feed/orders-list/orders-list'
import OrdersMeta from '../../components/feed/orders-meta/orders-meta'
import styles from '../styles.module.css'

const FeedPage: FC = () => {
  return (
    <div className={cn(styles.container, 'mt-10')}>
      <p className={cn(styles.title, 'ml-5 mb-5 text text_type_main-large')}>Лента заказов</p>
      <OrdersList />
      <OrdersMeta />
    </div>
  )
}

export default FeedPage
