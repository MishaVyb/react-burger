import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useRefScroll from '../../../hooks/use-ref-scroll'
import { loadIngredients } from '../../../services/ingredients/actions'
import { selectIngredientsItems } from '../../../services/ingredients/selectors'
import { IngredientTypes as Tabs } from '../../../utils/types'
import IngredientsList from '../ingredients-list/ingredients-list'
import { NavBar } from '../navbar/navbar'
import styles from './styles.module.css'

const BurgerIngredients = () => {
  const dispatch = useDispatch()
  const ingredients = useSelector(selectIngredientsItems)
  const [currentTab, setCurrentTab] = useState(Tabs.BUN)
  const viewRootRef = useRef()

  useEffect(() => {
    dispatch(loadIngredients())
  }, [dispatch])

  // TODO move to selector?
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
      <NavBar current={currentTab} setCurrent={setCurrentTab} onNavigationCalls={{ bun, sauce, main }} />
      <div className={styles.view_root} ref={viewRootRef}>
        VIEPORT FOR Itersaction Observer Api
      </div>
      <section className={`custom-scroll ${styles.scroll}`}>
        <IngredientsList
          viewRootRef={viewRootRef}
          onView={(v) => (v ? setCurrentTab(currentTab && Tabs.BUN) : setCurrentTab(undefined))}
          ref={bunRef}
          items={bunItems}
          title='Булки'
        />
        <IngredientsList
          viewRootRef={viewRootRef}
          onView={(v) => (v ? setCurrentTab(currentTab && Tabs.SAUCE) : setCurrentTab(undefined))}
          ref={sauceRef}
          items={sauceItems}
          title='Соусы'
        />
        <IngredientsList
          viewRootRef={viewRootRef}
          onView={(v) => (v ? setCurrentTab(currentTab && Tabs.MAIN) : setCurrentTab(undefined))}
          ref={mainRef}
          items={mainItems}
          title='Начинки'
        />
      </section>
    </section>
  )
}

export default BurgerIngredients
