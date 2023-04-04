import React from 'react'
import PropTypes from 'prop-types'
import ElementsList from './ElementsList'
import json from '../../utils/data'
import BurgerElement from './BurgerElement'
import ElementsTotal from './ElementsTotal'

const BurgerConstuctor = props => {
  const topItem = json.at(0)
  const bottomItem = json.at(-1)
  const middleItems = json.slice(1, -1)
  console.log(bottomItem)

  return (
    <div
      className='pt-25 pl-4 pr-4 custom-scroll'
      style={{
        border: '2px solid #4C4CFF',
        background: '#131316',
        //
        width: 600,
        
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center'
        // alignItems: 'center'
      }}>

      <BurgerElement item={topItem} arrangement='top'/>
      <ElementsList items={middleItems}/>
      <BurgerElement item={bottomItem} arrangement='bottom'/>
      <ElementsTotal/>
    </div>
  )
}

BurgerConstuctor.propTypes = {

}

export default BurgerConstuctor