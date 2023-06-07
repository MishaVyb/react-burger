import cn from 'classnames'
import { FC } from 'react'

import Navbar from '../../../components/profile/navbar/navbar'
import UpdateProfile from '../../../components/profile/update-profile/update-profile'
import styles from '../../styles.module.css'

const ProfilePage: FC = () => {
  return (
    <div className={cn(styles.container, 'mt-20')}>
      <Navbar hintText='В этом разделе вы можете изменить свои персональные данные' />
      <UpdateProfile />
    </div>
  )
}

export default ProfilePage
