import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import Modal from '../../../UI/modal/modal'
import { setCurrentIngredientDetail, unsetCurrentIngredientDetail } from '../../../services/ingredientDetail/actions'
import { loadIngredients } from '../../../services/ingredients/actions'
import { selectIngredientsItem } from '../../../services/ingredients/selectors'
import IngredientDetail from '../ingredient-detail/ingredient-detail'

const IngredientDetailModal = ({ backgroundPath, backgroundElement }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const ingredient = useSelector(selectIngredientsItem(id))
  const dispatch = useDispatch()

  // load (update) ingredients
  useEffect(() => dispatch(loadIngredients()), [dispatch])

  // set current ingredient as modal content
  useEffect(() => {
    if (ingredient) dispatch(setCurrentIngredientDetail(ingredient))
    return () => dispatch(unsetCurrentIngredientDetail())
  }, [dispatch, ingredient])

  return (
    <Modal initialShow backgroundElement={backgroundElement} onClose={() => navigate(backgroundPath)}>
      <IngredientDetail />
    </Modal>
  )
}

IngredientDetailModal.propTypes = {
  backgroundPath: PropTypes.string.isRequired,
  backgroundElement: PropTypes.element,
}

export default IngredientDetailModal
