import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../../../UI/loader/loader'
import { loadUser } from '../../../services/auth/actions'
import { selectAuthRequestStatus, selectUser } from '../../../services/auth/selectors'

const UpdateProfile = () => {
  const [form, setForm] = useState({ ...useSelector(selectUser), password: '' })
  const [loading, error] = useSelector(selectAuthRequestStatus)
  const dispatch = useDispatch()

  const onFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  useEffect(() => dispatch(loadUser()), [dispatch])

  if (loading) return <Loader />

  return (
    <main>
      <Input
        type='text'
        placeholder='Имя'
        icon='EditIcon'
        onChange={onFormChange}
        value={form.name}
        name='name'
        extraClass='m-3'
      />
      <Input
        type='email'
        placeholder='E-mail'
        icon='EditIcon'
        onChange={onFormChange}
        value={form.email}
        name='email'
        extraClass='m-3'
      />
      <Input
        type='password'
        placeholder='Пароль'
        icon='EditIcon'
        onChange={onFormChange}
        value={form.password}
        name='password'
        extraClass='m-3'
      />
    </main>
  )
}

export default UpdateProfile
