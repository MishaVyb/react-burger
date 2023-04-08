import React from 'react'
import PropTypes from 'prop-types'
import NavBar from '../navbar/navbar'
import IngredientsList from '../ingredients-list/ingredients-list'
import json from '../../../utils/data'
import styles from './styles.module.css'

const BurgerIngredients = ({ ingredients }) => {
  if (!ingredients.length) {
    return <></>
  }

  // TODO useMemo
  const bunItems = ingredients.filter((v) => v.type === 'bun')
  const sauceItems = ingredients.filter((v) => v.type === 'sauce')
  const mainItems = ingredients.filter((v) => v.type === 'main')

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

BurgerIngredients.propTypes = {
  ingredients: PropTypes.array // TODO arrayOf
}


export default BurgerIngredients