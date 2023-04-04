import React from 'react'
import PropTypes from 'prop-types'
import style from './header.module.css'

const Navbar = props => {
  return (
    <nav className={style.container}>
      {props.children}
    </nav>
  )
}

Navbar.propTypes = {

}

export default Navbar