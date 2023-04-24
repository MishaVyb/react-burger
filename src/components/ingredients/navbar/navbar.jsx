import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import React from 'react'

import { IngredientTypes as Tabs } from '../../../utils/types'
import styles from './styles.module.css'

export const NavBar = ({ current, setCurrent, onNavigationCalls }) => {
  const onClick = (e) => {
    setCurrent(e)
    if (typeof onNavigationCalls[e] === 'function') {
      onNavigationCalls[e]()
    }
  }

  return (
    <>
      <p className='text text_type_main-large'>Соберите бургер</p>
      <nav className={`mt-5 mb-5 ${styles.navbar}`}>
        <Tab value={Tabs.BUN} active={current === Tabs.BUN} onClick={onClick}>
          Булки
        </Tab>
        <Tab value={Tabs.SAUCE} active={current === Tabs.SAUCE} onClick={onClick}>
          Соусы
        </Tab>
        <Tab value={Tabs.MAIN} active={current === Tabs.MAIN} onClick={onClick}>
          Начинки
        </Tab>
      </nav>
    </>
  )
}

NavBar.propTypes = {
  current: PropTypes.oneOf([Tabs.BUN, Tabs.SAUCE, Tabs.MAIN]),
  setCurrent: PropTypes.func.isRequired,
  onNavigationCalls: PropTypes.shape({
    bun: PropTypes.func.isRequired,
    sauce: PropTypes.func.isRequired,
    main: PropTypes.func.isRequired,
  }).isRequired,
}
