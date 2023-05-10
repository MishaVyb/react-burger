import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import { selectIsAuthenticated } from '../services/auth/selectors'

const RouteDispatch = ({ loginRequired, children }) => {
  const isAuth = useSelector(selectIsAuthenticated)
  const location = useLocation()

  if (loginRequired) {
    if (isAuth) return children
    return <Navigate to='/login' state={{ from: location.pathname }} />
  }

  if (isAuth) return <Navigate to={location?.state?.from || '/'} />
  return children
}

RouteDispatch.propTypes = {
  loginRequired: PropTypes.bool,
  children: PropTypes.element.isRequired,
}

export default RouteDispatch
