import { forwardRef } from 'react'
import { InView } from 'react-intersection-observer'

import { TBurgerIngredient } from '../../../utils/types'
import IngredientCard from '../ingredient-card/ingredient-card'
import styles from './styles.module.css'

interface IIngredientsListProps {
  onView: (inView: boolean) => void
  items: TBurgerIngredient[]
  title: string
}

const IngredientsList = forwardRef<HTMLInputElement, IIngredientsListProps>(({ onView, items, title }, ref) => {
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
            <IngredientCard item={v} />
          </div>
        ))}
      </div>
    </div>
  )
})

IngredientsList.displayName = 'IngredientsList'

export default IngredientsList
