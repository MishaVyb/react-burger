import React, { useEffect, useState } from 'react'

import AppHeader from './components/header/app-header/app-header'
import BurgerConstructor from './components/constructor/burger-constructor/burger-constructor'
import BurgerIngredients from './components/ingredients/burger-ingredients/burger-ingredients'
import style from './app.module.css'

const ROOT_ENDPOINT = 'https://norma.nomoreparties.space/api/ingredients'

function App() {
  const [state, setState] = useState({
    data: [],
    loading: true,
    hasError: false,
  })

  useEffect(() => {
    fetch(ROOT_ENDPOINT)
      .then((response) => response.json())
      .then((result) => setState({ data: result.data, loading: false, hasError: false }))
      .catch((e) => setState({ ...this.state, loading: false, hasError: true, errorDetail: e }))
  }, [])

  return (
    <main className={style.container}>
      <AppHeader />
      {state.loading ? (
        <h1>loading...</h1>
      ) : (
        <>
          <BurgerIngredients ingredients={state.data} />
          <BurgerConstructor ingredients={state.data} />
        </>
      )}
    </main>
  )
}

export default App
