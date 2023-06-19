import { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import OrderDetail from '../../components/feed/order-detail/order-detail'
import { useDispatch, useSelector } from '../../hooks/redux'
import { selectAccessTokenSimplified } from '../../services/auth/reducer'
import { connectFeed, disconnectFeed } from '../../services/feed/actions'
import { WS_FEED_URL, WS_ORDERS_URL } from '../../utils/burger-api'

const FeedOrderDetailPage: FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const token = useSelector(selectAccessTokenSimplified)
  const wsUrl = location.pathname.match('/profile/orders/.*') ? `${WS_ORDERS_URL}?token=${token}` : WS_FEED_URL
  console.log({ wsUrl })

  // As order detail openned as independent page (not modal),
  // We have to upload orders by connection to WebSocket
  useEffect(() => {
    dispatch(connectFeed(wsUrl))
    return () => {
      dispatch(disconnectFeed())
    }
  }, [dispatch, wsUrl])

  return (
    <section className='pt-10'>
      <OrderDetail extraClass='p-6' />
    </section>
  )
}

export default FeedOrderDetailPage
