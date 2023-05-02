import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import Navbar from '../navbar/navbar'
import IconNavLink from '../navlink/navlink'
import styles from './styles.module.css'

const AppHeader = () => {
  return (
    <div className={`p-4 ${styles.container}`}>
      <header>
        <Navbar extraClass={styles.navbar_left}>
          <IconNavLink icon={BurgerIcon} to='/' title='Конструктор' />
          <IconNavLink icon={ListIcon} to='profile/orders' title='Лента заказов' />
        </Navbar>

        <div className={styles.logo}>
          <Logo />
        </div>

        <Navbar extraClass={styles.navbar_right}>
          <IconNavLink icon={ProfileIcon} to='profile' title='Личный кабинет' />
        </Navbar>
      </header>
    </div>
  )
}

export default AppHeader
