import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'

const Navbar = (props) => {
  return <nav className={styles.container}>{props.children}</nav>
}

Navbar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired,
}

export default Navbar