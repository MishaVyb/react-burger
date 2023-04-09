import { useEffect, useState } from 'react'

import style from './app.module.css'
import BurgerConstructor from './components/constructor/burger-constructor/burger-constructor'
import ErrorAllert from './components/error-allert/error-allert'
import AppHeader from './components/header/app-header/app-header'
import BurgerIngredients from './components/ingredients/burger-ingredients/burger-ingredients'
import fetchIngredients from './utils/burger-api'

function App() {
  const [state, setState] = useState({
    data: [],
    loading: true,
    hasError: false,
  })

  useEffect(() => {
    fetchIngredients(setState)
  }, [])

  return (
    <main className={style.container}>
      <AppHeader />
      {state.loading ? (
        <p className='m-20 text text_type_main-large text_color_inactive'>loading...</p>
      ) : (
        <>
          {state.hasError && <ErrorAllert detail={state.errorDetail} />}
          <BurgerIngredients ingredients={state.data} />
          <BurgerConstructor ingredients={state.data} />
        </>
      )}
    </main>
  )
}

export default App
