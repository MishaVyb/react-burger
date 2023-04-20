import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector } from 'react-redux'

import style from './app.module.css'
import BurgerConstructor from './components/constructor/burger-constructor/burger-constructor'
import AppHeader from './components/header/app-header/app-header'
import BurgerIngredients from './components/ingredients/burger-ingredients/burger-ingredients'
import { CustomDragLayer } from './components/ingredients/ingredient-card/drag-layer'

function App() {
  const store = useSelector((store) => store)
  console.log('APP STORE: ', store)

  return (
    <main className={style.container}>
      <AppHeader />
      {/* {state.loading ? (
        <p className='m-20 text text_type_main-large text_color_inactive'>loading...</p>
      ) : ( */}
      <>
        {/* {state.hasError && <ErrorAllert detail={state.errorDetail} />} */}
        <DndProvider backend={HTML5Backend}>
          <CustomDragLayer />
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </>
    </main>
  )
}

export default App
