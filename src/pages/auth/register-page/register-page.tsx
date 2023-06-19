import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from '../../../hooks/redux'
import { loadRegister, resetRequestStatusAction } from '../../../services/auth/actions'
import { selectAuthRequestStatus } from '../../../services/auth/reducer'
import styles from '../styles.module.css'

const RegisterPage: FC = () => {
  const [form, setForm] = useState({ email: '', password: '', name: '' })
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const [loading, error] = useSelector(selectAuthRequestStatus)

  useEffect(
    () => () => {
      dispatch(resetRequestStatusAction())
    },
    [dispatch]
  )

  const onPasswordShowIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0)
    setShowPassword(!showPassword)
  }

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value })
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loadRegister(form))
  }

  return (
    <form className={styles.container} onSubmit={onFormSubmit}>
      <p className='m-3 text text_type_main-medium'>Регистрация</p>
      <Input
        type='text'
        placeholder='Имя'
        onChange={onFormChange}
        value={form.name}
        name='name'
        error={!!error}
        extraClass='m-3'
        required
      />
      <Input
        type='email'
        placeholder='E-mail'
        onChange={onFormChange}
        value={form.email}
        name='email'
        error={!!error}
        extraClass='m-3'
        required
      />
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder='Пароль'
        icon={showPassword ? 'ShowIcon' : 'HideIcon'}
        onChange={onFormChange}
        value={form.password}
        name='password'
        ref={inputRef}
        error={!!error}
        errorText={error}
        onIconClick={onPasswordShowIconClick}
        extraClass='m-3'
        required
      />
      <Button htmlType='submit' type='primary' size='medium' extraClass='m-3'>
        {loading ? 'Загрузка...' : 'Зарегистрироваться'}
      </Button>
      <div className={styles.guideline}>
        <p className='mt-20 text text_type_main-default text_color_inactive'>Уже зарегистрированы?</p>
        <Link to='/login' className='mt-20 ml-2 text text_type_main-default'>
          Войти
        </Link>
      </div>
    </form>
  )
}
export default RegisterPage
