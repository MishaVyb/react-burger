import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectConstructorBuns, selectConstructorItems } from '../../../services/constructor/selectors'
import { loadOrder } from '../../../services/order/actions'
import { selectOrder } from '../../../services/order/selectors'
import styles from './styles.module.css'

const OrderDetail = () => {
  const items = useSelector(selectConstructorItems)
  const bun = useSelector(selectConstructorBuns)
  const order = useSelector(selectOrder)
  const dispatch = useDispatch()

  useEffect(() => dispatch(loadOrder(items, bun)), [dispatch, items, bun])

  return (
    <section className={styles.container}>
      <p className={`mt-8 text text_type_main-default ${styles.subtitle}`}>{order.name}</p>
      <p className={`mt-20 text text_type_digits-large ${styles.title}`}>{order.number}</p>
      <p className={`mt-8 text text_type_main-default ${styles.subtitle}`}>идентификатор заказа</p>
      <div className={`m-15 ${styles.icon}`}>
        <CheckMarkIcon />
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
