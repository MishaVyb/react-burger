import { FC, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useRefScroll from '../../../hooks/use-ref-scroll'
import { loadIngredients } from '../../../services/ingredients/actions'
import { selectIngredientsItems } from '../../../services/ingredients/selectors'
import { TBurgerIngredient, IngredientTypes as Tabs } from '../../../utils/types'
import IngredientsList from '../ingredients-list/ingredients-list'
import { NavBar } from '../navbar/navbar'
import styles from './styles.module.css'

interface IActiveTabs {
  [Tabs.bun]?: boolean
  [Tabs.sauce]?: boolean
  [Tabs.main]?: boolean
}

const BurgerIngredients: FC = () => {
  const dispatch = useDispatch()
  const ingredients: TBurgerIngredient[] = useSelector(selectIngredientsItems)
  const [activeTabs, setActviveTabs] = useState<IActiveTabs>({ [Tabs.bun]: true })
  const currentActiveTab = [Tabs.bun, Tabs.sauce, Tabs.main].find((type) => activeTabs[type]) || Tabs.bun

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!ingredients.length) dispatch(loadIngredients())
  }, [dispatch, ingredients])

  const handleTabViewChange = (inView: boolean, type: Tabs) => {
    const newState: IActiveTabs = {}
    if (!inView) {
      switch (type) {
        case Tabs.bun:
          newState[Tabs.bun] = false
          newState[Tabs.sauce] = true
          break
        case Tabs.sauce:
          newState[Tabs.sauce] = false
          newState[Tabs.main] = true
          break
        case Tabs.main:
          newState[Tabs.main] = true
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
          onView={(inView) => handleTabViewChange(inView, Tabs.bun)}
          ref={bunRef}
          items={bunItems}
          title='Булки'
        />
        <IngredientsList
          onView={(inView) => handleTabViewChange(inView, Tabs.sauce)}
          ref={sauceRef}
          items={sauceItems}
          title='Соусы'
        />
        <IngredientsList
          onView={(inView) => handleTabViewChange(inView, Tabs.main)}
          ref={mainRef}
          items={mainItems}
          title='Начинки'
        />
      </section>
    </section>
  )
}

export default BurgerIngredients
