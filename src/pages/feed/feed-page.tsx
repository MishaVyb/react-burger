import cn from 'classnames'
import { FC, useEffect } from 'react'

import OrdersList from '../../components/feed/orders-list/orders-list'
import OrdersMeta from '../../components/feed/orders-meta/orders-meta'
import { useDispatch } from '../../hooks/redux'
import { connectFeed, disconnectFeed } from '../../services/feed/actions'
import { WS_FEED_URL } from '../../utils/burger-api'
import styles from '../styles.module.css'

const FeedPage: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(connectFeed(WS_FEED_URL))
    return () => {
      dispatch(disconnectFeed())
    }
  }, [dispatch])

  return (
    <div className={cn(styles.container, 'mt-10')}>
      <p className={cn(styles.title, 'ml-5 mb-5 text text_type_main-large')}>Лента заказов</p>
      <OrdersList />
      <OrdersMeta />
    </div>
  )
}

export default FeedPage
