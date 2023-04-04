import React from 'react'
import PropTypes from 'prop-types'
import NavBar from './NavBar'
import IngredientsList from './IngredientsList'
import json from '../../utils/data'

const BurgerIngredients = (props) => {
  const bunItems = json.filter((v) => v.type === 'bun')
  const sauceItems = json.filter((v) => v.type === 'sauce')
  const mainItems = json.filter((v) => v.type === 'main')

  return (
    <div
      className='pt-10 mr-5'
      style={{
        border: '2px solid #4C4CFF',
        background: '#131316',
        //
        width: 600,

        display: 'flex',
        flexDirection: 'column',
        // overflowY: 'scroll'
      }}
    >
      <NavBar />
      <div
        className='custom-scroll'
        style={{
          overflowY: 'scroll',
        }}
      >
        <IngredientsList items={bunItems} title='Булки' />
        <IngredientsList items={sauceItems} title='Соусы' />
        <IngredientsList items={mainItems} title='Начинки' />
      </div>
    </div>
  )
}

BurgerIngredients.propTypes = {}

export default BurgerIngredients
