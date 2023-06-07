import cn from 'classnames'
import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'

import OrdersList from '../../../components/feed/orders-list/orders-list'
import Navbar from '../../../components/profile/navbar/navbar'
import { useDispatch } from '../../../hooks/redux'
import { selectAccessTokenSimplified } from '../../../services/auth/reducer'
import { connectFeed, disconnectFeed } from '../../../services/feed/actions'
import { WS_ORDERS_URL } from '../../../utils/burger-api'
import styles from '../../styles.module.css'

const ProfileOrdersPage: FC = () => {
  const dispatch = useDispatch()
  const token = useSelector(selectAccessTokenSimplified)

  useEffect(() => {
    dispatch(connectFeed(`${WS_ORDERS_URL}?token=${token}`))
    return () => {
      dispatch(disconnectFeed())
    }
  }, [dispatch, token])

  return (
    <div className={cn(styles.container, 'mt-20')}>
      <Navbar hintText='В этом разделе вы можете просмотреть свою историю заказов' />
      <OrdersList extraClass={styles.orders} />
    </div>
  )
}

export default ProfileOrdersPage
