import cn from 'classnames'
import { FC, useEffect } from 'react'

import { useDispatch, useSelector } from '../../../hooks/redux'
import { selectOrders } from '../../../services/feed/reducer'
import { loadIngredients } from '../../../services/ingredients/actions'
import { selectIngredientsItems } from '../../../services/ingredients/reducer'
import OrderElement from '../order-element/order-element'
import styles from './styles.module.css'

const OrdersList: FC = () => {
  const orders = useSelector(selectOrders)
  const ingredients = useSelector(selectIngredientsItems)
  const dispatch = useDispatch()

  useEffect(() => {
    // NOTE: upload ingredients in case they are not in the store
    if (!ingredients.length) dispatch(loadIngredients())
  }, [dispatch, ingredients])

  return (
    <div className={cn(styles.container, 'custom-scroll', styles.scroll)}>
      {orders.map((order) => (
        <OrderElement key={order._id} order={order} />
      ))}
    </div>
  )
}

export default OrdersList
