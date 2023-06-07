import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { FC, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import CurrencyView from '../../../UI/currency-view/currency-view'
import { useDispatch, useSelector } from '../../../hooks/redux'
import { selectOrder } from '../../../services/feed/reducer'
import { loadIngredients } from '../../../services/ingredients/actions'
import { selectIngredientsGroupsByIds, selectIngredientsItems } from '../../../services/ingredients/reducer'
import OrderStatus from '../order-status/order-status'
import styles from './styles.module.css'

const OrderDetail: FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const order = useSelector(selectOrder(id))
  const ingredients = useSelector(selectIngredientsItems)
  const orderIngredients = useSelector(selectIngredientsGroupsByIds(order?.ingredients))
  const orderIngredientsCost = Object.values(orderIngredients).reduce(
    (acc, itemGroup) => acc + itemGroup.reduce((acc, item) => acc + item.price, 0),
    0
  )

  useEffect(() => {
    // NOTE: upload ingredients in case they are not in the store
    if (!ingredients.length) dispatch(loadIngredients())
  }, [dispatch, ingredients])

  // TODO
  // загружать заказы через сокет, если открыли как отдельную страницу по ссылке
  if (!order) return <Navigate to='/order-not-found' />

  return (
    <div className={cn(styles.container, 'm-2')}>
      <p className='text text_type_digits-default'>#{order.number}</p>
      <div className={cn(styles.heading, '')}></div>
      <p className={cn('text text_type_main-medium mt-10', styles.align_left)}>{order.name}</p>
      <OrderStatus status={order.status} />
      <p className={cn('text text_type_main-large mt-15 mb-4', styles.align_left)}>Состав:</p>

      <div className={cn(styles.ingredients, 'custom-scroll', styles.scroll)}>
        {Object.values(orderIngredients).map((ingredientsGroup) => {
          const item = ingredientsGroup[0]
          const amount = ingredientsGroup.length
          return (
            <div key={item._id} className={cn('mt-2 mb-2', styles.ingredient)}>
              <img className={styles.ingredient_image} src={item.image_mobile} alt='' width='90' height='90' />
              <p className={cn('text text_type_main-default ml-4')}>{item.name}</p>
              <CurrencyView className={cn(styles.ingredient_total, 'mr-6')} value={`${amount} x ${item.price}`} />
            </div>
          )
        })}
      </div>

      <div className={cn(styles.bottom, 'mt-10')}>
        <FormattedDate
          date={new Date(order.createdAt)}
          className={cn('text text_type_main-default text_color_inactive', styles.align_left)}
        />
        <CurrencyView className={cn(styles.ingredient_total, 'mr-8')} value={orderIngredientsCost} />
      </div>
    </div>
  )
}

export default OrderDetail
