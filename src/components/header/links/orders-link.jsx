import React from 'react'
import PropTypes from 'prop-types'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './links.module.css'

const OrdersLinks = props => {
  return (
    <div className={`pl-5 pr-5 ${style.container}`}>
      <ListIcon type='secondary'/>
      <p className="text text_type_main-default ml-2">
        Лента заказов
      </p>
    </div>
  )
}

OrdersLinks.propTypes = {

}

export default OrdersLinks