import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector } from 'react-redux'

import style from './app.module.css'
import BurgerConstructor from './components/constructor/burger-constructor/burger-constructor'
import AppHeader from './components/header/app-header/app-header'
import BurgerIngredients from './components/ingredients/burger-ingredients/burger-ingredients'
import { CustomDragLayer } from './components/ingredients/ingredient-card/drag-layer'

function App() {
  const err = useSelector((store) => store.ingredients.error) // FIXME
  console.log('ERROR FROM STORE ', err)

  return (
    <main className={style.container}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <CustomDragLayer />
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  )
}

export default App
