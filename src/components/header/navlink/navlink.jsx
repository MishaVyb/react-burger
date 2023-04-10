import PropTypes from 'prop-types'

import styles from './styles.module.css'

const NavLink = ({ title, children }) => {
  return (
    <a className={`pl-5 pr-5 ${styles.link}`} href='/'>
      {children}
      <p className='text text_type_main-default ml-2'>{title}</p>
    </a>
  )
}

NavLink.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
}

export default NavLink
