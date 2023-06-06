import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { Link, useLocation } from 'react-router-dom'

import CurrencyView from '../../../UI/currency-view/currency-view'
import { useDispatch } from '../../../hooks/redux'
import { setMovingItemIndex } from '../../../services/constructor/reducer'
import { TBurgerIngredient, getDragGroup } from '../../../utils/types'
import styles from './styles.module.css'

const IngredientCard: FC<{ item: TBurgerIngredient }> = ({ item }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [{ opacity }, dragRef, preview] = useDrag<TBurgerIngredient, void, { opacity: number }>({
    type: getDragGroup(item),

    // NOTE: full item object here to implement custom drag layer render
    item: { ...item },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
    end: () => dispatch(setMovingItemIndex(null)),
  })

  useEffect(() => {
    preview(getEmptyImage())
  }, [preview])

  return (
    <Link
      to={`/ingredients/${item._id}`}
      // Set the `backgroundLocation` in location state
      // so that when we open the modal we still see the current page in the background.
      state={{ backgroundLocation: location }}
      className={`m-3 ${styles.card}`}
      ref={dragRef}
      style={{ opacity }}
    >
      {item.counter ? <Counter count={item.counter} size='default' extraClass='m-1' /> : null}
      <img className='ml-2 mr-2' src={item.image} alt='' />
      <CurrencyView number={item.price} />
      <p className={`text text_type_main-small mt-1 mb-4 ${styles.align}`}>{item.name}</p>
    </Link>
  )
}

export default IngredientCard
