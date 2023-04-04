
import React from 'react'
import { BurgerIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'

import style from './header.module.css'
import NavbarLeft from './NavbarLeft'
import ProfileLink from './links/profile-link'
import NavbarRight from './NavbarRight'

const Header = () => {
  return (
    <header className={`p-4 ${style.container}`}>
      <NavbarLeft/>
      <Logo/>
      <NavbarRight/>
    </header>
  )
}

export default Header
