import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from '../../../hooks/redux'
import { selectIsAuthenticated } from '../../../services/auth/reducer'
import { selectConstructorBun, selectConstructorItems } from '../../../services/constructor/reducer'
import { loadOrder } from '../../../services/order/actions'
import { selectOrder } from '../../../services/order/reducer'
import styles from './styles.module.css'

const OrderDetail: FC = () => {
  const items = useSelector(selectConstructorItems)
  const bun = useSelector(selectConstructorBun)
  const order = useSelector(selectOrder)
  const isAuth: boolean = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    isAuth ? dispatch(loadOrder({ items, bun })) : navigate('/login')
  }, [dispatch, items, bun, navigate, isAuth])

  return (
    <section className={styles.container}>
      <p className={`mt-20 text text_type_main-medium ${styles.subtitle}`}>{order.name}</p>
      <p className={`mt-8 text text_type_digits-large ${styles.title}`}>{order.number}</p>
      <p className={`mt-8 text text_type_main-default ${styles.subtitle}`}>идентификатор заказа</p>
      <div className={`m-15 ${styles.icon}`}>
        <CheckMarkIcon type='primary' />
      </div>
      <p className='text text_type_main-small'>Ваш заказ начали готовить</p>
      <p className='mt-2 mb-20 text text_type_main-small text_color_inactive'>
        Дождитесь готовности на орбитальной станции
      </p>
    </section>
  )
}

OrderDetail.propTypes = {}

export default OrderDetail
