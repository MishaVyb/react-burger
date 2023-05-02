import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import styles from '../styles.module.css'

const RegisterPage = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)
  const [showPassword, setShowPassword] = useState(false)

  const showPasswordHandle = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    setShowPassword(!showPassword)
  }

  return (
    <section className={styles.container}>
      <p className='m-3 text text_type_main-medium'>Регистрация</p>
      <Input
        type='text'
        placeholder='Имя'
        onChange={(e) => setValue(e.target.value)}
        value={value}
        name='username'
        extraClass='m-3'
      />
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
        Зарегистрироваться
      </Button>
      <div className={styles.guideline}>
        <p className='mt-20 text text_type_main-default text_color_inactive'>Уже зарегистрированы?</p>
        <Link to='/login' className='mt-20 ml-2 text text_type_main-default'>
          Войти
        </Link>
      </div>
    </section>
  )
}
export default RegisterPage
