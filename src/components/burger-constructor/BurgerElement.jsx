import React from 'react'
import PropTypes from 'prop-types'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

// TODO raname: ConstructorElement
const BurgerElement = ({ item, arrangement }) => {
  return (
    <div className='mt-2 mb-2' style={{ display: 'flex', alignItems: 'center' }}>
      {arrangement ? <></> : <DragIcon type='primary' />}
      <div className={arrangement ? 'ml-8' : 'ml-2'}>
        <ConstructorElement
          type={arrangement}
          isLocked={arrangement}
          text={item.name}
          price={item.price}
          thumbnail={item.image_mobile}
        />
      </div>
    </div>
  )
}

BurgerElement.propTypes = {}

export default BurgerElement
