import React from 'react'
import PropTypes from 'prop-types'
import ConstructorLink from './links/constuctor-link'
import OrdersLinks from './links/orders-link'
import style from './header.module.css'


const NavbarLeft = props => {
  return (
    <nav className={style.container}>
      <ConstructorLink/>
      <OrdersLinks/>
    </nav>
  )
}

NavbarLeft.propTypes = {

}

export default NavbarLeft