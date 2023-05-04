import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Loader from '../../../UI/loader/loader'
import { loadUser, resetRequestStatus, updateUser } from '../../../services/auth/actions'
import { selectAuthRequestStatus, selectUser } from '../../../services/auth/selectors'
import styles from './styles.module.css'

const UpdateProfile = () => {
  const initialFormState = { ...useSelector(selectUser), password: '' }
  const initialUpdatesState = { name: false, email: false, password: false }
  const [loading, error] = useSelector(selectAuthRequestStatus)
  const dispatch = useDispatch()

  const [form, setForm] = useState(initialFormState)
  const [formUpdates, setFormUpdates] = useState(initialUpdatesState)
  const inputRefs = { name: useRef(), email: useRef(), password: useRef() }

  useEffect(() => dispatch(loadUser()), [dispatch])
  useEffect(() => () => dispatch(resetRequestStatus()), [dispatch])

  const onFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onFormSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser(form))
    setFormUpdates(initialUpdatesState)
    dispatch(resetRequestStatus())
  }

  const onIconClick = (key) => () => {
    setTimeout(() => inputRefs[key].current.focus(), 0)
    setFormUpdates({ ...formUpdates, [key]: !formUpdates[key] })
    setForm({ ...form, [key]: initialFormState[key] })
  }
  const onEditCancel = (e) => {
    e.preventDefault()
    setForm(initialFormState)
    setFormUpdates(initialUpdatesState)
    dispatch(resetRequestStatus())
  }

  let wasChanged = false
  for (const key in form) {
    if (form[key] !== initialFormState[key]) {
      wasChanged = true
      break
    }
  }

  return (
    <form onSubmit={onFormSubmit}>
      <Input
        type='text'
        placeholder='Имя'
        icon={formUpdates.name ? 'CloseIcon' : 'EditIcon'}
        ref={inputRefs.name}
        onIconClick={onIconClick('name')}
        onChange={onFormChange}
        value={form.name}
        error={!!error}
        name='name'
        extraClass='m-3'
        disabled={!formUpdates.name}
      />
      <Input
        type='email'
        placeholder='Логин'
        icon={formUpdates.email ? 'CloseIcon' : 'EditIcon'}
        ref={inputRefs.email}
        onIconClick={onIconClick('email')}
        onChange={onFormChange}
        value={form.email}
        error={!!error}
        name='email'
        extraClass='m-3'
        disabled={!formUpdates.email}
      />
      <Input
        type='password'
        placeholder='Пароль'
        icon={formUpdates.password ? 'CloseIcon' : 'EditIcon'}
        ref={inputRefs.password}
        onIconClick={onIconClick('password')}
        onChange={onFormChange}
        value={form.password}
        error={!!error}
        errorText={error}
        name='password'
        extraClass='m-3'
        disabled={!formUpdates.password}
      />
      {wasChanged ? (
        <div className={styles.actions}>
          <Button htmlType='submit' type='primary' size='medium' extraClass='m-3'>
            {loading ? 'Загрузка...' : 'Сохранить'}
          </Button>
          <a onClick={onEditCancel} href='.' className='mr-4 text text_type_main-default'>
            Отмена
          </a>
        </div>
      ) : null}
    </form>
  )
}

export default UpdateProfile
