import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from '../../../hooks/redux'
import { loadForgotPassword, resetRequestStatusAction } from '../../../services/auth/actions'
import { selectAuthRequestStatus } from '../../../services/auth/selectors'
import styles from '../styles.module.css'

const ForgotPasswordPage: FC = () => {
  const [form, setForm] = useState({ email: '' })
  const [isSubmit, setIsSubmit] = useState(false)
  const dispatch = useDispatch()
  const [loading, error] = useSelector(selectAuthRequestStatus)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(
    () => () => {
      dispatch(resetRequestStatusAction())
    },
    [dispatch]
  )
  useEffect(() => {
    if (isSubmit && !loading && !error) navigate('/reset-password', { state: { from: location.pathname } })
  }, [navigate, isSubmit, loading, error, location.pathname])

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value })
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loadForgotPassword(form))
    setIsSubmit(true)
  }

  return (
    <form className={styles.container} onSubmit={onFormSubmit}>
      <p className='m-3 text text_type_main-medium'>Восстановление пароля</p>
      <Input
        type='email'
        placeholder='E-mail'
        onChange={onFormChange}
        value={form.email}
        name='email'
        error={!!error}
        errorText={error}
        extraClass='m-3'
        required
      />
      <Button htmlType='submit' type='primary' size='medium' extraClass='m-3'>
        {loading ? 'Загрузка...' : 'Восстановить'}
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
export default ForgotPasswordPage
