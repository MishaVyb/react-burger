import cn from 'classnames'
import { FC } from 'react'

import Navbar from '../../../components/profile/navbar/navbar'
import styles from '../../styles.module.css'

const ProfileOrdersPage: FC = () => {
  return (
    <div className={cn(styles.container, 'mt-20')}>
      <Navbar />
    </div>
  )
}

export default ProfileOrdersPage
