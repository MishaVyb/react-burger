import React from 'react'

import AppHeader from './components/app-header/AppHeader'
import BurgerConstructor from './components/burger-constructor/BurgerConstructor'
import BurgerIngredients from './components/burger-ingredients/BurgerIngredients'
import style from './app.module.css'

function App() {
  return (
    <main className={style.container}>
      <AppHeader />
      {/* <main className={style.aaa}> */}
      <BurgerIngredients />
      <BurgerConstructor />
      {/* </main> */}
    </main>
  )
}

export default App
