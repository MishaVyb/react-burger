import BurgerConstructor from '../../components/constructor/burger-constructor/burger-constructor'
import BurgerIngredients from '../../components/ingredients/burger-ingredients/burger-ingredients'
import { CustomDragLayer } from '../../components/ingredients/ingredient-card/drag-layer'

const HomePage = () => {
  return (
    <>
      <CustomDragLayer />
      <BurgerIngredients />
      <BurgerConstructor />
    </>
  )
}

export default HomePage
