import React from 'react'

import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeader from './components/app-header/AppHeader'
import BurgerConstuctor from './components/burger-constructor/BurgerConstuctor'
import BurgerIngredients from './components/burger-ingredients/BurgerIngredients'
import style from './app.module.css'

function App() {
  return (
    <>
      <AppHeader/>
      <main className={style.container}>
        <BurgerIngredients/>
        <BurgerConstuctor/>

      </main>
    </>
  )
}

export default App
