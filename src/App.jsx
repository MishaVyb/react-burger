import React from 'react'

import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Header from './components/header/Header'
import BurgerConstuctor from './components/burger-constructor/BurgerConstuctor'
import BurgerIngredients from './components/burger-ingredients/BurgerIngredients'
import style from './app.module.css'

function App() {
  return (
    <div
    // className={style.container}
    >
      <Header></Header>
      <div className={style.container}>
        <BurgerIngredients/>
        <BurgerConstuctor/>

      </div>
    </div>
  )
}

export default App
