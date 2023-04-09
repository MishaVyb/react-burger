import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import Modal from '../../../UI/modal/modal'
import BurgerIngredientType from '../../../utils/types'
import IngredientCard from '../ingredient-card/ingredient-card'
import IngredientDetail from '../ingredient-detail/ingredient-detail'
import styles from './styles.module.css'

const IngredientsList = forwardRef(({ items, title }, ref) => {
  return (
    <div className='mt-5 mb-5'>
      <p className='text text_type_main-medium' ref={ref}>
        {title}
      </p>
      <div className={`mt-2 mb-2 ${styles.container}`}>
        {items.map((v, i) => (
          <div key={v._id} className={styles.item}>
            <Modal triggerElement={<IngredientCard item={v} count={i} />}>
              <IngredientDetail item={v} />
            </Modal>
          </div>
        ))}
      </div>
    </div>
  )
})

IngredientsList.displayName = 'IngredientsList'

IngredientsList.propTypes = {
  items: PropTypes.arrayOf(BurgerIngredientType).isRequired,
  title: PropTypes.string,
}

export default IngredientsList
