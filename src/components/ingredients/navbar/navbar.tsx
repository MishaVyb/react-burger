import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'

import { IngredientTypes as Tabs, isIngredientType } from '../../../utils/types'
import styles from './styles.module.css'

interface TNavBarProps {
  current: Tabs
  setCurrent: (type: Tabs) => void
  onNavigationCalls: {
    [key in keyof typeof Tabs]: () => void
  }
}

export const NavBar: FC<TNavBarProps> = ({ current, setCurrent, onNavigationCalls }) => {
  const onClick = (value: string) => {
    if (!isIngredientType(value)) {
      throw Error('Value must be one of Tabs enum. ')
    }

    setCurrent(value)
    onNavigationCalls[value]()
  }

  return (
    <>
      <p className='text text_type_main-large'>Соберите бургер</p>
      <nav className={`mt-5 mb-5 ${styles.navbar}`}>
        <Tab value={Tabs.bun} active={current === Tabs.bun} onClick={onClick}>
          Булки
        </Tab>
        <Tab value={Tabs.sauce} active={current === Tabs.sauce} onClick={onClick}>
          Соусы
        </Tab>
        <Tab value={Tabs.main} active={current === Tabs.main} onClick={onClick}>
          Начинки
        </Tab>
      </nav>
    </>
  )
}
