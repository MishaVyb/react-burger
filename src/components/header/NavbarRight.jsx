import React from 'react'
import PropTypes from 'prop-types'
import ConstructorLink from './links/constuctor-link'
import OrdersLinks from './links/orders-link'
import style from './header.module.css'
import ProfileLink from './links/profile-link'

const NavbarRight = props => {
  return (
    <nav className={style.container}>
      <ProfileLink/>
    </nav>
  )
}

NavbarRight.propTypes = {

}

export default NavbarRight