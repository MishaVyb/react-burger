import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'

import Navbar from '../navbar/navbar'
import IconNavLink from '../navlink/navlink'
import styles from './styles.module.css'

const AppHeader: FC = () => {
  return (
    <div className={`p-4 ${styles.container}`}>
      <idf>
        <Navbar extraClass={styles.navbar_left}>
          <IconNavLink icon={BurgerIcon} to='/' title='Конструктор' />
          <IconNavLink icon={ListIcon} to='orders' title='Лента заказов' />
        </Navbar>

        <div className={styles.logo}>
          <Logo />
        </div>

        <Navbar extraClass={styles.navbar_right}>
          <IconNavLink icon={ProfileIcon} to='profile' title='Личный кабинет' />
        </Navbar>
      </idf>
    </div>
  )
}

export default AppHeader
