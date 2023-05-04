import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { selectIsAuthenticated } from '../services/auth/selectors'

const RouteDispatch = ({ loginRequired, children }) => {
  const isAuth = useSelector(selectIsAuthenticated)

  if (loginRequired) {
    if (isAuth) return children
    return <Navigate to='/login' />
  }

  if (isAuth) return <Navigate to='/' />
  return children
}

RouteDispatch.propTypes = {
  loginRequired: PropTypes.bool,
  children: PropTypes.element.isRequired,
}

export default RouteDispatch
