import React from 'react'
import PropTypes from 'prop-types'
import NavBar from './NavBar'
import IngredientsList from './IngredientsList'
import json from '../../utils/data'
import styles from './styles.module.css'

const BurgerIngredients = () => {
  const bunItems = json.filter((v) => v.type === 'bun')
  const sauceItems = json.filter((v) => v.type === 'sauce')
  const mainItems = json.filter((v) => v.type === 'main')

  return (
    <section className={`pt-10 mr-5 ${styles.container}`}>
      <NavBar />
      <section className={`custom-scroll ${styles.scroll}`}>
        <IngredientsList items={bunItems} title='Булки' />
        <IngredientsList items={sauceItems} title='Соусы' />
        <IngredientsList items={mainItems} title='Начинки' />
      </section>
    </section>
  )
}

BurgerIngredients.propTypes = {}

export default BurgerIngredients
