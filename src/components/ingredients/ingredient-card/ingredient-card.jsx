import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import CurrencyView from '../../../UI/currency-view/currency-view'
import { removeConstructorItem, setMovingItemIndex } from '../../../services/constructor/actions'
import { selectConstructorMovingItemIndex } from '../../../services/constructor/selectors'
import { BurgerIngredientType, DragTypes } from '../../../utils/types'
import styles from './styles.module.css'

const IngredientCard = ({ item }) => {
  const dispatch = useDispatch()
  const constructorMovingItemIndex = useSelector(selectConstructorMovingItemIndex)
  const [{ opacity }, dragRef, preview] = useDrag({
    type: DragTypes.forItem(item),

    // NOTE: full item object here to implement custom drag layer render
    item: { ...item },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
    end: (item, monitor) => {
      dispatch(setMovingItemIndex(null))
      if (!monitor.didDrop()) {
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

IngredientCard.propTypes = {
  item: BurgerIngredientType,
}

export default IngredientCard
