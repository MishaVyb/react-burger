import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { loadResetPassword, resetRequestStatus } from '../../../services/auth/actions'
import { selectAuthRequestStatus } from '../../../services/auth/selectors'
import styles from '../styles.module.css'

const ResetPasswordPage = () => {
  const [form, setForm] = useState({ password: '', token: '' })
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef()
  const [isSubmit, setIsSubmit] = useState(false)
  const dispatch = useDispatch()
  const [loading, error] = useSelector(selectAuthRequestStatus)
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location)

  useEffect(() => {
    if (location?.state?.from !== '/forgot-password') navigate('/forgot-password')
  })
  useEffect(() => () => dispatch(resetRequestStatus()), [dispatch])
  useEffect(() => {
    if (isSubmit && !loading && !error) navigate('/login')
  }, [navigate, isSubmit, loading, error])

  const onPasswordShowIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    setShowPassword(!showPassword)
  }

  const onFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onFormSubmit = (e) => {
    e.preventDefault()
    dispatch(loadResetPassword(form))
    setIsSubmit(true)
  }

  return (
    <form className={styles.container} onSubmit={onFormSubmit}>
      <p className='m-3 text text_type_main-medium'>Восстановление пароля</p>
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder='Введите новый пароль'
        icon={showPassword ? 'ShowIcon' : 'HideIcon'}
        onChange={onFormChange}
        value={form.password}
        name='password'
        ref={inputRef}
        error={!!error}
        onIconClick={onPasswordShowIconClick}
        extraClass='m-3'
        required
      />
      <Input
        type='text'
        placeholder='Введите код из письма'
        onChange={onFormChange}
        value={form.token}
        name='token'
        error={!!error}
        errorText={error}
        extraClass='m-3'
        required
      />
      <Button htmlType='submit' type='primary' size='medium' extraClass='m-3'>
        {loading ? 'Загрузка...' : 'Сохранить'}
      </Button>
      <div className={styles.guideline}>
        <p className='mt-20 text text_type_main-default text_color_inactive'>Вспомнили пароль?</p>
        <Link to='/login' className='mt-20 ml-2 text text_type_main-default'>
          Войти
        </Link>
      </div>
    </form>
  )
}
export default ResetPasswordPage
