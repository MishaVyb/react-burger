import React from 'react'

import AppHeader from './components/app-header/AppHeader'
import BurgerConstructor from './components/burger-constructor/BurgerConstructor'
import BurgerIngredients from './components/burger-ingredients/BurgerIngredients'
import style from './app.module.css'

function App() {
  return (
    <>
      <AppHeader />
      <main className={style.container}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  )
}

export default App
