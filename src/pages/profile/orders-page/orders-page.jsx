import cn from 'classnames'

import Navbar from '../../../components/profile/navbar/navbar'
import styles from '../styles.module.css'

const ProfileOrdersPage = () => {
  return (
    <main className={cn(styles.container, 'mt-20')}>
      <Navbar />
    </main>
  )
}

export default ProfileOrdersPage
