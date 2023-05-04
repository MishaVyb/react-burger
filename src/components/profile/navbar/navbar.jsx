import cn from 'classnames'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

import { loadLogout, resetRequestStatus } from '../../../services/auth/actions'
import { selectAuthRequestStatus } from '../../../services/auth/selectors'
import styles from './styles.module.css'

const Navbar = () => {
  const dispatch = useDispatch()
  const [loading, error] = useSelector(selectAuthRequestStatus)
  const navigate = useNavigate()

  useEffect(() => () => dispatch(resetRequestStatus()), [dispatch])

  const onLogout = (e) => {
    e.preventDefault()
    dispatch(loadLogout())
  }

  const navLinkClassName = cn('mt-3 mb-3 ', 'text text_type_main-medium', 'navlink')
  return (
    <nav className={cn(styles.container, 'm-4')}>
      <NavLink to='/profile' end className={navLinkClassName}>
        Профиль
      </NavLink>
      <NavLink to='/profile/orders' className={navLinkClassName}>
        История заказов
      </NavLink>
      <a href='/logout' to='/profile/logout' className={navLinkClassName} onClick={onLogout}>
        {loading ? 'Загрузка...' : 'Выход'}
      </a>
      <p className='mt-20 text text_type_main-default text_color_inactive'>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  )
}

export default Navbar
