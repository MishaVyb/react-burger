import React from 'react'
import PropTypes from 'prop-types'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'

const Tabs = {
  BUN: 'bun',
  SAUCE: 'sauce',
  MAIN: 'main',
}

const NavBar = () => {
  const [current, setCurrent] = React.useState(Tabs.BUN)
  return (
    <>
      <p className='text text_type_main-large'>Соберите бургер</p>
      <nav className={`mt-5 mb-5 ${styles.navbar}`}>
        <Tab value={Tabs.BUN} active={current === Tabs.BUN} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value={Tabs.SAUCE} active={current === Tabs.SAUCE} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value={Tabs.MAIN} active={current === Tabs.MAIN} onClick={setCurrent}>
          Начинки
        </Tab>
      </nav>
    </>
  )
}

export default NavBar
