import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Modal from '../../../UI/modal/modal'
import IngredientDetail from '../ingredient-detail/ingredient-detail'

const IngredientDetailModal: FC = () => {
  const location = useLocation()
  const state = location.state as { backgroundLocation?: Location }
  const backgroundPath = state?.backgroundLocation?.pathname
  const navigate = useNavigate()

  return (
    <Modal initialShow onClose={() => (backgroundPath ? navigate(backgroundPath) : null)}>
      <IngredientDetail />
    </Modal>
  )
}

export default IngredientDetailModal
