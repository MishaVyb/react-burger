import { useEffect, useMemo, useState } from 'react'
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
  const [activeTabs, setActviveTabs] = useState({
    [Tabs.BUN]: true,
    [Tabs.SAUCE]: false,
    [Tabs.MAIN]: false,
  })

  var currentActiveTab
  for (const key of [Tabs.BUN, Tabs.SAUCE, Tabs.MAIN]) {
    if (activeTabs[key]) {
      currentActiveTab = key
      break
    }
  }

  useEffect(() => {
    dispatch(loadIngredients())
  }, [dispatch])

  const handleTabViewChange = (inView, type) => {
    const newState = {}
    if (!inView) {
      for (const key of [Tabs.BUN, Tabs.SAUCE, Tabs.MAIN]) {
        if (key === type) {
          newState[key] = false
        }
      }
      switch (type) {
        case Tabs.BUN:
          newState[Tabs.SAUCE] = true
          break
        case Tabs.SAUCE:
          newState[Tabs.MAIN] = true
          break
        case Tabs.MAIN:
          newState[Tabs.MAIN] = true
          break
        default:
          return
      }
    } else {
      newState[type] = true
    }

    setActviveTabs((current) => ({ ...current, ...newState }))
  }

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
      <NavBar
        current={currentActiveTab}
        setCurrent={(type) => handleTabViewChange(true, type)}
        onNavigationCalls={{ bun, sauce, main }}
      />
      <section className={`custom-scroll ${styles.scroll}`}>
        <IngredientsList
          onView={(inView) => handleTabViewChange(inView, Tabs.BUN)}
          ref={bunRef}
          items={bunItems}
          title='Булки'
        />
        <IngredientsList
          onView={(inView) => handleTabViewChange(inView, Tabs.SAUCE)}
          ref={sauceRef}
          items={sauceItems}
          title='Соусы'
        />
        <IngredientsList
          onView={(inView) => handleTabViewChange(inView, Tabs.MAIN)}
          ref={mainRef}
          items={mainItems}
          title='Начинки'
        />
      </section>
    </section>
  )
}

export default BurgerIngredients
