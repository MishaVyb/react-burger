import React from 'react'
import PropTypes from 'prop-types'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

const NavBar = props => {
  const [current, setCurrent] = React.useState('one')
  return (
    <>
      <text className='text text_type_main-large'>Соберите бургер</text>
      <div className='mt-5 mb-5' style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

    </>

  )
}

NavBar.propTypes = {

}

export default NavBar