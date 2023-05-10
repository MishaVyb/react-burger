import cn from 'classnames'

import Navbar from '../../../components/profile/navbar/navbar'
import UpdateProfile from '../../../components/profile/update-profile/update-profile'
import styles from '../styles.module.css'

const ProfilePage = () => {
  return (
    <main className={cn(styles.container, 'mt-20')}>
      <Navbar />
      <UpdateProfile />
    </main>
  )
}

export default ProfilePage
