import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import styles from '../styles.module.css'

const ForgotPasswordPage = () => {
  const [value, setValue] = useState('')

  return (
    <section className={styles.container}>
      <p className='m-3 text text_type_main-medium'>Восстановление пароля</p>
      <Input
        type='e-mail'
        placeholder='Укажите e-mail'
        onChange={(e) => setValue(e.target.value)}
        value={value}
        name='e-mail'
        extraClass='m-3'
      />
      <Button htmlType='button' type='primary' size='medium' extraClass='m-3'>
        Восстановить
      </Button>
      <div className={styles.guideline}>
        <p className='mt-20 text text_type_main-default text_color_inactive'>Вспомнили пароль?</p>
        <Link to='/login' className='mt-20 ml-2 text text_type_main-default'>
          Войти
        </Link>
      </div>
    </section>
  )
}
export default ForgotPasswordPage
