import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

import CurrencyView from '../../../UI/currency-view/currency-view'
import Modal from '../../../UI/modal/modal'
import OrderDetail from '../order-detail/order-detail'
import styles from './styles.module.css'

const ElementsTotal = () => {
  const total = 610

  return (
    <div className={`mt-10 ${styles.container}`}>
      <Modal
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
