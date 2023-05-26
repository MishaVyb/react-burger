import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'
import { useSelector } from 'react-redux'

import CurrencyView from '../../../UI/currency-view/currency-view'
import Modal from '../../../UI/modal/modal'
import { selectConstructorIsComplete, selectConstructorTotal } from '../../../services/constructor/selectors'
import OrderDetail from '../order-detail/order-detail'
import styles from './styles.module.css'

const ElementsTotal: FC = () => {
  const total: number = useSelector(selectConstructorTotal)
  const isComplete: boolean = useSelector(selectConstructorIsComplete)

  return (
    <div className={`mt-10 ${styles.container}`}>
      <Modal
        disable={!isComplete}
        triggerElement={
          <Button extraClass='ml-5' htmlType='button'>
            Оформить заказ
          </Button>
        }
      >
        <OrderDetail />
      </Modal>

      <CurrencyView number={total} size='medium' />
    </div>
  )
}

export default ElementsTotal
