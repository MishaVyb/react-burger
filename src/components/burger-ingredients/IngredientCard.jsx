import React from 'react'
import PropTypes from 'prop-types'
import CurrencyView from '../../UI/CurrencyView'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'

const IngredientCard = ({ item, count }) => {
  const pos = 'top-70 start-54' // TODO

  return (
    <div
      className='m-3'
      style={{
        border: '2px solid #4C4C1F',
        //
        display: 'flex',
        flexDirection: 'column',
        // flexBasis: '40%',

        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {count ? (
        <div className={`position-absolute ${pos}`}>
          <Counter count={count} size='default' extraClass='m-1' />
        </div>
      ) : (
        <></>
      )}
      <img className='ml-2 mr-2' src={item.image} alt='' />
      <CurrencyView number={item.price} />
      <p style={{ textAlign: 'center' }} className='text text_type_main-small mt-1 mb-4'>
        {item.name}
      </p>
    </div>
  )
}

IngredientCard.propTypes = {}

export default IngredientCard
