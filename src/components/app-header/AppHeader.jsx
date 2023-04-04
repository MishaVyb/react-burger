import React from 'react'
import { BurgerIcon, Logo, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import style from './header.module.css'
import Navbar from './Navbar'
import NavLink from './NavLink'

const AppHeader = () => {
  return (
    <header className={`p-4 ${style.container}`}>
      <Navbar>
        <NavLink title='Конструктор'><BurgerIcon />
        </NavLink>
        <NavLink title='Лента заказов'>
          <ListIcon />
        </NavLink>
      </Navbar>
      <Logo />
      <Navbar>
        <NavLink title='Личный кабинет'>
          <ProfileIcon />
        </NavLink>
      </Navbar>
    </header>
  )
}

export default AppHeader
