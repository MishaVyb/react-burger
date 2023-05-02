import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import styles from '../styles.module.css'

const LoginPage = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)
  const [showPassword, setShowPassword] = useState(false)

  const showPasswordHandle = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    setShowPassword(!showPassword)
  }

  return (
    <section className={styles.container}>
      <p className='m-3 text text_type_main-medium'>Вход</p>
      <Input
        type='email'
        placeholder='E-mail'
        onChange={(e) => setValue(e.target.value)}
        value={value}
        name='email'
        extraClass='m-3'
      />
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder='Пароль'
        onChange={(e) => setValue(e.target.value)}
        icon={showPassword ? 'ShowIcon' : 'HideIcon'}
        value={value}
        name='password'
        ref={inputRef}
        onIconClick={showPasswordHandle}
        extraClass='m-3'
      />
      <Button htmlType='button' type='primary' size='medium' extraClass='m-3'>
        Войти
      </Button>
      <div className={styles.guideline}>
        <p className='mt-20 text text_type_main-default text_color_inactive'>Вы — новый пользователь?</p>
        <Link to='/register' className='mt-20 ml-2 text text_type_main-default'>
          Зарегистрироваться
        </Link>
      </div>
      <div className={styles.guideline}>
        <p className='mt-4 text text_type_main-default text_color_inactive'>Забыли пароль?</p>
        <Link to='/forgot-password' className='mt-4 ml-2 text text_type_main-default'>
          Восстановить пароль
        </Link>
      </div>
    </section>
  )
}
export default LoginPage
