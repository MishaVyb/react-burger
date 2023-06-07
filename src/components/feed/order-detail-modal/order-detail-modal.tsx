import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Modal from '../../../UI/modal/modal'
import OrderDetail from '../order-detail/order-detail'

const OrderDetailModal: FC = () => {
  const location = useLocation()
  const state = location.state as { backgroundLocation?: Location }
  const backgroundPath = state?.backgroundLocation?.pathname
  const navigate = useNavigate()

  return (
    <div style={{ zIndex: 10 }}>
      <Modal initialShow onClose={() => (backgroundPath ? navigate(backgroundPath) : null)}>
        <OrderDetail />
      </Modal>
    </div>
  )
}

export default OrderDetailModal
