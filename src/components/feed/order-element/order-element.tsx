import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { FC } from 'react'

import CurrencyView from '../../../UI/currency-view/currency-view'
import { useSelector } from '../../../hooks/redux'
import { TFeedOrder } from '../../../services/feed/reducer'
import { selectIngredientsItemsByIds } from '../../../services/ingredients/reducer'
import styles from './styles.module.css'

const OrderElement: FC<{ order: TFeedOrder }> = ({ order }) => {
  const ingredientsShowLimit = 2 // plus another one in case overflow
  const orderIngredients = useSelector(selectIngredientsItemsByIds(order.ingredients))
  const orderIngredientsCost = orderIngredients.reduce((acc, item) => acc + item.price, 0)

  return (
    <div className={cn(styles.container, 'm-2 p-6')}>
      <div className={cn(styles.heading, '')}>
        <p className='text text_type_digits-default'>#{order.number}</p>
        <FormattedDate date={new Date(order.createdAt)} className='text text_type_main-default text_color_inactive' />
      </div>
      <p className='text text_type_main-medium mt-6'>{order.name}</p>
      <div className={cn(styles.ingredients, 'mt-6 pl-8')}>
        {orderIngredients.map((v, i) => {
          if (i > ingredientsShowLimit) return null
          const isOverflow = i === ingredientsShowLimit && i !== orderIngredients.length - 1
          return (
            <>
              {isOverflow ? (
                // For the last one (in case overflow) show count of not listed ingredients
                <p
                  style={{ zIndex: orderIngredients.length }}
                  className={cn(styles.ingredient_counter, 'text text_type_digits-default')}
                >
                  +{orderIngredients.length - ingredientsShowLimit}
                </p>
              ) : null}
              <img
                key={i}
                style={{ zIndex: Math.abs(i - orderIngredients.length), opacity: isOverflow ? 0.5 : 1 }}
                className={styles.ingredient_image}
                src={v.image_mobile}
                alt=''
                width='90'
                height='90'
              />
            </>
          )
        })}

        <CurrencyView className={styles.total} number={orderIngredientsCost} size='medium' />
      </div>
    </div>
  )
}

export default OrderElement
