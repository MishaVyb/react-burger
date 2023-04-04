import React from 'react'
import PropTypes from 'prop-types'
import NavBar from './NavBar'
import IngredientsList from './IngredientsList'

const BurgerIngredients = props => {
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
      }}>
      <NavBar/>
      <IngredientsList title='Булки'/>

    </div>
  )
}

BurgerIngredients.propTypes = {

}

export default BurgerIngredients