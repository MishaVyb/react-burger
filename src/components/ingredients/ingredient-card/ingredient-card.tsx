import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import CurrencyView from '../../../UI/currency-view/currency-view'
import { removeConstructorItem, setMovingItemIndex } from '../../../services/constructor/actions'
import { selectConstructorMovingItemIndex } from '../../../services/constructor/selectors'
import { IngredientTypes, TBurgerIngredient, getDragGroup } from '../../../utils/types'
import styles from './styles.module.css'

const IngredientCard: FC<{ item: TBurgerIngredient }> = ({ item }) => {
  const dispatch = useDispatch()
  const constructorMovingItemIndex: number | null = useSelector(selectConstructorMovingItemIndex)
  const [{ opacity }, dragRef, preview] = useDrag<TBurgerIngredient, void, { opacity: number }>({
    type: getDragGroup(item),

    // NOTE: full item object here to implement custom drag layer render
    item: { ...item },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
    end: (item, monitor) => {
      dispatch(setMovingItemIndex(null))
      if (
        !monitor.didDrop() &&
        item.type !== IngredientTypes.bun // Bun can not be removed
      ) {
        dispatch(removeConstructorItem(item, constructorMovingItemIndex))
      }
    },
  })

  useEffect(() => {
    preview(getEmptyImage())
  }, [preview])

  return (
    <Link to={`/ingredients/${item._id}`} className={`m-3 ${styles.card}`} ref={dragRef} style={{ opacity }}>
      {item.counter ? <Counter count={item.counter} size='default' extraClass='m-1' /> : null}
      <img className='ml-2 mr-2' src={item.image} alt='' />
      <CurrencyView number={item.price} />
      <p className={`text text_type_main-small mt-1 mb-4 ${styles.align}`}>{item.name}</p>
    </Link>
  )
}

export default IngredientCard
