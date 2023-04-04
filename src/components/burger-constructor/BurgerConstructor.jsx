import React from 'react'
import PropTypes from 'prop-types'
import ElementsList from './ElementsList'
import json from '../../utils/data'
import {BurgerElement} from './BurgerElement'
import ElementsTotal from './ElementsTotal'
import styles from './styles.module.css'

const BurgerConstructor = () => {
  const topItem = json.at(0)
  const bottomItem = json.at(-1)
  const middleItems = json.slice(1, -1)

  return (
    <div className={`pt-25 pb-10 pl-4 pr-4 custom-scroll ${styles.container}`}>
      <BurgerElement item={topItem} arrangement='top' />
      <ElementsList items={middleItems} />
      <BurgerElement item={bottomItem} arrangement='bottom' />
      <ElementsTotal />
    </div>
  )
}

BurgerConstructor.propTypes = {}

export default BurgerConstructor
