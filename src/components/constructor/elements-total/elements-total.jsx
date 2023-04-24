import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'

import CurrencyView from '../../../UI/currency-view/currency-view'
import Modal from '../../../UI/modal/modal'
import {
  selectConstructorBun,
  selectConstructorItems,
  selectConstructorTotal,
} from '../../../services/constructor/selectors'
import OrderDetail from '../order-detail/order-detail'
import styles from './styles.module.css'

const ElementsTotal = () => {
  const total = useSelector(selectConstructorTotal)
  const items = useSelector(selectConstructorItems)
  const bun = useSelector(selectConstructorBun)

  return (
    <div className={`mt-10 ${styles.container}`}>
      <Modal
        disable={!(items.length && bun)}
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
