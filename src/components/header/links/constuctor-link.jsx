import React from 'react'
import PropTypes from 'prop-types'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './links.module.css'

const ConstructorLink = props => {
  return (
    <div className={`pl-5 pr-5 ${style.container}`}>
      <BurgerIcon/>
      <p className="text text_type_main-default ml-2">
        Конструктор
      </p>
    </div>
  )
}

ConstructorLink.propTypes = {

}

export default ConstructorLink