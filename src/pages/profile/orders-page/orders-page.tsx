import cn from 'classnames'
import { FC } from 'react'

import OrdersList from '../../../components/feed/orders-list/orders-list'
import Navbar from '../../../components/profile/navbar/navbar'
import styles from '../../styles.module.css'

const ProfileOrdersPage: FC = () => {
  return (
    <div className={cn(styles.container, 'mt-20')}>
      <Navbar hintText='В этом разделе вы можете просмотреть свою историю заказов' />
      <OrdersList extraClass={styles.orders} />
    </div>
  )
}

export default ProfileOrdersPage
