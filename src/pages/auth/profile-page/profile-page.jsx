import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'

import styles from './styles.module.css'

const ProfilePage = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef(null) // отдельный реф для каждого поля

  const editHandle = () => {
    setTimeout(() => inputRef.current.focus(), 0)
  }

  const className = cn('mt-3 mb-3 ', 'text text_type_main-medium', 'navlink')
  return (
    <div className={cn(styles.container, 'mt-20')}>
      {/* TODO decompose to another component. Next sprint. */}
      <nav className={cn(styles.navigation, 'm-4')}>
        <NavLink to='/profile' className={className}>
          Профиль
        </NavLink>
        <NavLink to='/profile/orders' className={className}>
          История заказов
        </NavLink>
        <NavLink to='/profile/orders/:id' className={className}>
          Выход
        </NavLink>
        <p className='mt-20 text text_type_main-default text_color_inactive'>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>

      <section>
        <Input
          type='text'
          placeholder='Имя'
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name='username'
          ref={inputRef}
          icon={'EditIcon'}
          onIconClick={editHandle}
          extraClass='m-3'
        />
        <Input
          type='email'
          placeholder='E-mail'
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name='email'
          ref={inputRef}
          icon={'EditIcon'}
          onIconClick={editHandle}
          extraClass='m-3'
        />
        <Input
          type={'password'}
          placeholder='Пароль'
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name='password'
          ref={inputRef}
          icon={'EditIcon'}
          onIconClick={editHandle}
          extraClass='m-3'
        />
      </section>
    </div>
  )
}

export default ProfilePage
