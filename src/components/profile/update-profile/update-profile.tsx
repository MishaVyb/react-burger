import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { ChangeEvent, FC, FormEvent, MouseEvent, RefObject, useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from '../../../hooks/redux'
import { IUserPayload, loadUser, resetRequestStatusAction, updateUser } from '../../../services/auth/actions'
import { selectAuthRequestStatus, selectUser } from '../../../services/auth/reducer'
import styles from './styles.module.css'

const UpdateProfile: FC = () => {
  const initialFormState: IUserPayload = {
    ...useSelector(selectUser),
    password: '',
  }
  const initialUpdatesState: { [key in keyof IUserPayload]: boolean } = { name: false, email: false, password: false }
  const [loading, error] = useSelector(selectAuthRequestStatus)
  const dispatch = useDispatch()

  const [form, setForm] = useState(initialFormState)
  const [formUpdates, setFormUpdates] = useState(initialUpdatesState)
  const inputRefs: { [key in keyof IUserPayload]: RefObject<HTMLInputElement> } = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  }

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  useEffect(
    () => () => {
      dispatch(resetRequestStatusAction())
    },
    [dispatch]
  )

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value })
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateUser(form))
    dispatch(resetRequestStatusAction())
    setFormUpdates(initialUpdatesState)

    // NOTE: we do not hold password value after form submit: reset form value
    setForm((state) => ({ ...state, password: '' }))
  }

  const onIconClick = (key: keyof IUserPayload) => () => {
    setTimeout(() => inputRefs[key].current?.focus(), 0)
    setFormUpdates({ ...formUpdates, [key]: !formUpdates[key] })
    setForm({ ...form, [key]: initialFormState[key] })
  }
  const onEditCancel = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setForm(initialFormState)
    setFormUpdates(initialUpdatesState)
    dispatch(resetRequestStatusAction())
  }

  let wasChanged = false
  for (const key of Object.typedKeys(form)) {
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
