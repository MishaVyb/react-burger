import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import CurrencyView from '../../../UI/currency-view/currency-view'
import { BurgerIngredientType, DragTypes } from '../../../utils/types'
import styles from './styles.module.css'

// eslint-disable-next-line react/prop-types
const IngredientCard = ({ item, count }) => {
  const [{ opacity, isDragging }, dragRef, preview] = useDrag({
    type: DragTypes.forItem(item),
    item: { ...item },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
      isDragging: monitor.isDragging(),
    }),
  })

  useEffect(() => {
    preview(getEmptyImage())
  }, [preview])

  return (
    <div className={`m-3 ${styles.card}`} ref={dragRef} style={{ opacity }}>
      {count ? <Counter count={count} size='default' extraClass='m-1' /> : null}
      <img className='ml-2 mr-2' src={item.image} alt='' />
      <CurrencyView number={item.price} />
      <p className={`text text_type_main-small mt-1 mb-4 ${styles.align}`}>{item.name}</p>
    </div>
  )
}

IngredientCard.propTypes = {
  item: BurgerIngredientType,
  count: PropTypes.number,
}

export default IngredientCard
