import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadRegister, resetRequestStatus } from '../../../services/auth/actions'
import { selectAuthRequestStatus } from '../../../services/auth/selectors'
import styles from '../styles.module.css'

const RegisterPage = () => {
  const [form, setForm] = useState({ email: '', password: '', name: '' })
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const [loading, error] = useSelector(selectAuthRequestStatus)

  useEffect(() => () => dispatch(resetRequestStatus()), [dispatch])

  const onPasswordShowIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    setShowPassword(!showPassword)
  }

  const onFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onFormSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    dispatch(loadRegister(Object.fromEntries(formData.entries())))
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
        type='text' // type='email' // XXX
        placeholder='E-mail'
        onChange={onFormChange}
        value={form.email}
        name='email'
        error={!!error}
        extraClass='m-3'
        required
      />
      <Input
        type='text' // type={showPassword ? 'text' : 'password'} // !!!
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
