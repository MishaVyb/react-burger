import React from 'react'
import PropTypes from 'prop-types'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'

const NavBar = () => {
  const [current, setCurrent] = React.useState('one')
  return (
    <>
      <p className='text text_type_main-large'>Соберите бургер</p>
      <nav className={`mt-5 mb-5 ${styles.navbar}`}>
        <Tab value='one' active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='two' active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='three' active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </nav>
    </>
  )
}

NavBar.propTypes = {}

export default NavBar
