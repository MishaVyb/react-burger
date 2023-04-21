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
    <InView as='div' onChange={(inView, entry) => (inView ? onView() : null)}>
      <div className='mt-5 mb-5'>
        <p className='text text_type_main-medium' ref={ref}>
          {title}
        </p>
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
    </InView>
  )
})

IngredientsList.displayName = 'IngredientsList'

IngredientsList.propTypes = {
  onView: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(BurgerIngredientType.isRequired).isRequired,
  title: PropTypes.string,
}

export default IngredientsList
