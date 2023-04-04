import React from 'react'
import PropTypes from 'prop-types'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import json from '../../utils/data'
import BurgerElement from './BurgerElement'

// TODO raname: ConstructorList
const ElementsList = ({items}) => {

  return (
    <div
      className='custom-scroll'
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll'
      }}>
      {
        items.map((v, i) => (<BurgerElement key={v._id} item={v} arrangement={null} />))
      }
    </div>
  )
}

ElementsList.propTypes = {

}

export default ElementsList