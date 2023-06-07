import cn from 'classnames'
import { FC, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from '../../../hooks/redux'
import { selectOrders } from '../../../services/feed/reducer'
import { loadIngredients } from '../../../services/ingredients/actions'
import { selectIngredientsItems } from '../../../services/ingredients/reducer'
import OrderElement from '../order-element/order-element'
import styles from './styles.module.css'

const OrdersList: FC<{ extraClass?: string }> = ({ extraClass }) => {
  const location = useLocation()
  const orders = useSelector(selectOrders)
  const ingredients = useSelector(selectIngredientsItems)
  const dispatch = useDispatch()

  useEffect(() => {
    // NOTE: upload ingredients in case they are not in the store
    if (!ingredients.length) dispatch(loadIngredients())
  }, [dispatch, ingredients])

  return (
    <div className={cn(styles.container, 'custom-scroll', styles.scroll, extraClass)}>
      {orders.map((order) => (
        <Link
          key={order._id}
          to={`${location.pathname}/${order._id}`}
          // Set the `backgroundLocation` in location state
          // so that when we open the modal we still see the current page in the background.
          state={{ backgroundLocation: location }}
          className={styles.order_link}
        >
          <OrderElement order={order} />
        </Link>
      ))}
    </div>
  )
}

export default OrdersList
