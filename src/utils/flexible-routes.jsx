import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { selectIsAuthenticated } from '../services/auth/selectors'

// eslint-disable-next-line react/prop-types
const RouteDispatch = ({ loginRequired, children }) => {
  const isAuth = useSelector(selectIsAuthenticated)

  if (loginRequired) {
    if (isAuth) return children
    return <Navigate to='/login' />
  }

  if (isAuth) return <Navigate to='/' />
  return children
}

export default RouteDispatch
