import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './styles.module.css'

const OrderDetail = (props) => {
  const orderNumber = '034536'

  return (
    <section className={styles.container}>
      <p className={`mt-20 text text_type_digits-large ${styles.title}`}>{orderNumber}</p>
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
