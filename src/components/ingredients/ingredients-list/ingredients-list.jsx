import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { InView } from 'react-intersection-observer'
import { useDispatch } from 'react-redux'

import Modal from '../../../UI/modal/modal'
import { setCurrentIngredientDetail, unsetCurrentIngredientDetail } from '../../../services/ingredientDetail/actions'
import { BurgerIngredientType } from '../../../utils/types'
import IngredientCard from '../ingredient-card/ingredient-card'
import IngredientDetail from '../ingredient-detail/ingredient-detail'
import styles from './styles.module.css'

const IngredientsList = forwardRef(({ onView, items, title }, ref) => {
  const dispatch = useDispatch()

  return (
    <div className='mt-5 mb-5'>
      <InView as='div' onChange={(inView) => onView(inView)}>
        <p className='text text_type_main-medium' ref={ref}>
          {title}
        </p>
      </InView>
      <div className={`mt-2 mb-2 ${styles.container}`}>
        {items.map((v, i) => (
          <div key={v._id} className={styles.item}>
            <Modal
              onOpen={() => dispatch(setCurrentIngredientDetail(v))}
              onClose={() => dispatch(unsetCurrentIngredientDetail())}
              triggerElement={<IngredientCard item={v} />}
            >
              <IngredientDetail />
            </Modal>
          </div>
        ))}
      </div>
    </div>
  )
})

IngredientsList.displayName = 'IngredientsList'

IngredientsList.propTypes = {
  onView: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(BurgerIngredientType.isRequired).isRequired,
  title: PropTypes.string,
}

export default IngredientsList
