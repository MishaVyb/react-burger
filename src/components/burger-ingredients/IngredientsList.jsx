import React from 'react'
import PropTypes from 'prop-types'
import json from '../../utils/data'
import IngredientCard from './IngredientCard'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'

const IngredientsList = ({items, title}) => {

  return (
    <div className='mt-5 mb-5'>
      <text className="text text_type_main-medium">{title}</text>
      <div className='mt-2 mb-2' style={{display: 'flex', flexWrap: 'wrap'}}>
        {
          items.map((v, i) => (
            <div key={v._id} style={{flexBasis: '50%',}}>
              <IngredientCard item={v} count={i}/>
            </div>)
          )
        }
      </div>
    </div>
  )
}

IngredientsList.propTypes = {

}

export default IngredientsList