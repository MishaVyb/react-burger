import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'

import CurrencyView from '../../../UI/currency-view/currency-view'
import Modal from '../../../UI/modal/modal'
import { useSelector } from '../../../hooks/redux'
import { selectConstructorIsComplete, selectConstructorTotal } from '../../../services/constructor/reducer'
import OrderDetail from '../order-detail/order-detail'
import styles from './styles.module.css'

const ElementsTotal: FC = () => {
  const total = useSelector(selectConstructorTotal)
  const isComplete = useSelector(selectConstructorIsComplete)

  return (
    <div className={`mt-10 ${styles.container}`}>
      <Modal
        disable={!isComplete}
        triggerElement={
          <Button extraClass='ml-5' htmlType='button' data-testid='make-order-button'>
            Оформить заказ
          </Button>
        }
      >
        <OrderDetail />
      </Modal>

      <CurrencyView value={total} size='medium' />
    </div>
  )
}

export default ElementsTotal
