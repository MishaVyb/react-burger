import PropTypes from 'prop-types'
import { useMemo } from 'react'

import useRefScroll from '../../../hooks/use-ref-scroll'
import BurgerIngredientType from '../../../utils/types'
import IngredientsList from '../ingredients-list/ingredients-list'
import NavBar from '../navbar/navbar'
import styles from './styles.module.css'

const BurgerIngredients = ({ ingredients }) => {
  const [bunItems, sauceItems, mainItems] = useMemo(() => {
    const bunItems = ingredients.filter((v) => v.type === 'bun')
    const sauceItems = ingredients.filter((v) => v.type === 'sauce')
    const mainItems = ingredients.filter((v) => v.type === 'main')
    return [bunItems, sauceItems, mainItems]
  }, [ingredients])

  const [bunRef, bun] = useRefScroll()
  const [sauceRef, sauce] = useRefScroll()
  const [mainRef, main] = useRefScroll()

  if (!ingredients.length) {
    return <></>
  }

  return (
    <section className={`pt-10 mr-5 ${styles.container}`}>
      <NavBar onNavigationCalls={{ bun, sauce, main }} />
      <section className={`custom-scroll ${styles.scroll}`}>
        <IngredientsList ref={bunRef} items={bunItems} title='Булки' />
        <IngredientsList ref={sauceRef} items={sauceItems} title='Соусы' />
        <IngredientsList ref={mainRef} items={mainItems} title='Начинки' />
      </section>
    </section>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(BurgerIngredientType.isRequired).isRequired,
}

export default BurgerIngredients
