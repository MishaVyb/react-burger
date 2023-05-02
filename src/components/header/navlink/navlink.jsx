import cn from 'classnames'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import styles from './styles.module.css'

const IconNavLink = ({ icon, to, title }) => {
  return (
    <NavLink to={to} end className={`pl-5 pr-5 ${styles.link}`}>
      {({ isActive, isPending }) => (
        <>
          {icon({ type: isActive ? 'primary' : 'secondary' })}
          <p className={cn('ml-2', 'text text_type_main-default', { text_color_inactive: !isActive })}>{title}</p>
        </>
      )}
    </NavLink>
  )
}

IconNavLink.propTypes = {
  icon: PropTypes.elementType,
  to: PropTypes.string,
  title: PropTypes.string,
}

export default IconNavLink
