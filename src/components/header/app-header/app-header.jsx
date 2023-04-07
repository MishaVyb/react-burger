import React from 'react'
import { BurgerIcon, Logo, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import NavLink from '../navlink/navlink'
import styles from './styles.module.css'
import Navbar from '../navbar/navbar'

const AppHeader = () => {
  return (
    <div className={`p-4 ${styles.container}`}>
      <header>
        <Navbar extraClass={styles.navbar_left}>
          <NavLink title='Конструктор'>
            <BurgerIcon />
          </NavLink>
          <NavLink title='Лента заказов'>
            <ListIcon />
          </NavLink>
        </Navbar>

        <div className={styles.logo}>
          <Logo />
        </div>

        <Navbar extraClass={styles.navbar_right}>
          <NavLink title='Личный кабинет'>
            <ProfileIcon />
          </NavLink>
        </Navbar>
      </header>
    </div>
  )
}

export default AppHeader
