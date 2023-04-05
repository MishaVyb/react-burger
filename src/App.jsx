import React from 'react'

import AppHeader from './components/app-header/app-header'
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import style from './app.module.css'

function App() {
  return (
    <main className={style.container}>
      <AppHeader />
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  )
}

export default App
