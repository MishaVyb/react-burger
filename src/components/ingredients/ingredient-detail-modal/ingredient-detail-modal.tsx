import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import Modal from '../../../UI/modal/modal'
import { setCurrentIngredientDetail, unsetCurrentIngredientDetail } from '../../../services/ingredientDetail/actions'
import { loadIngredients } from '../../../services/ingredients/actions'
import { selectIngredientsItem } from '../../../services/ingredients/selectors'
import { TBurgerIngredient } from '../../../utils/types'
import IngredientDetail from '../ingredient-detail/ingredient-detail'

interface IIngredientDetailModalProps {
  backgroundPath: string
  backgroundElement: JSX.Element
}

const IngredientDetailModal: FC<IIngredientDetailModalProps> = ({ backgroundPath, backgroundElement }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const ingredient: TBurgerIngredient = useSelector(selectIngredientsItem(id))
  const dispatch = useDispatch()

  // load (update) ingredients:
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => dispatch(loadIngredients()), [dispatch])

  // set current ingredient as modal content:
  useEffect(() => {
    if (ingredient) dispatch(setCurrentIngredientDetail(ingredient))
    return () => {
      dispatch(unsetCurrentIngredientDetail())
    }
  }, [dispatch, ingredient])

  return (
    <Modal initialShow backgroundElement={backgroundElement} onClose={() => navigate(backgroundPath)}>
      <IngredientDetail />
    </Modal>
  )
}

export default IngredientDetailModal
