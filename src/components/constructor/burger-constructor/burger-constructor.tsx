import { FC } from 'react'

import { useSelector } from '../../../hooks/redux'
import { selectConstructorBun, selectConstructorItems } from '../../../services/constructor/reducer'
import BurgerElement from '../burger-element/burger-element'
import ElementsList from '../elements-list/elements-list'
import ElementsTotal from '../elements-total/elements-total'
import styles from './styles.module.css'

const BurgerConstructor: FC = () => {
  const bun = useSelector(selectConstructorBun)
  const items = useSelector(selectConstructorItems)

  return (
    <div className={`pt-25 pb-10 pl-4 pr-4 custom-scroll ${styles.container}`}>
      <BurgerElement item={bun} arrangement='top' />
      <ElementsList items={items} />
      <BurgerElement item={bun} arrangement='bottom' />
      <ElementsTotal />
    </div>
  )
}

export default BurgerConstructor
