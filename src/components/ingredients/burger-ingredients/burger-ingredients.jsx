import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import NavBar from '../navbar/navbar'
import IngredientsList from '../ingredients-list/ingredients-list'
import styles from './styles.module.css'
import BurgerIngredientType from '../../../utils/types'

const BurgerIngredients = ({ ingredients }) => {
  const [bunItems, sauceItems, mainItems] = useMemo(() => {
    const bunItems = ingredients.filter((v) => v.type === 'bun')
    const sauceItems = ingredients.filter((v) => v.type === 'sauce')
    const mainItems = ingredients.filter((v) => v.type === 'main')
    return [bunItems, sauceItems, mainItems]
  }, [ingredients])

  if (!ingredients.length) {
    return <></>
  }

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
  ingredients: PropTypes.arrayOf(BurgerIngredientType),
}

export default BurgerIngredients
