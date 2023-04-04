import React from 'react'
import PropTypes from 'prop-types'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'

const NavLink = ({ title, children }) => {
  return (
    <div className={`pl-5 pr-5 ${styles.container}`}>
      {children}
      <p className='text text_type_main-default ml-2'>{title}</p>
    </div>
  )
}

NavLink.propTypes = {}

export default NavLink
