import cn from 'classnames'
import { FC, MouseEvent, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { useDispatch, useSelector } from '../../../hooks/redux'
import { loadLogout, resetRequestStatusAction } from '../../../services/auth/actions'
import { selectAuthRequestStatus } from '../../../services/auth/reducer'
import styles from './styles.module.css'

const Navbar: FC<{ hintText?: string }> = ({ hintText }) => {
  const dispatch = useDispatch()
  const [loading] = useSelector(selectAuthRequestStatus)

  useEffect(
    () => () => {
      dispatch(resetRequestStatusAction())
    },
    [dispatch]
  )

  const onLogout = (e: MouseEvent<HTMLAnchorElement>) => {
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
      <a href='.' className={navLinkClassName} onClick={onLogout}>
        {loading ? 'Загрузка...' : 'Выход'}
      </a>
      <p className='mt-20 text text_type_main-default text_color_inactive mr-10'>{hintText}</p>
    </nav>
  )
}

export default Navbar
