import PropTypes from 'prop-types'

import styles from './styles.module.css'

const BlankConstructorElement = ({ arrangement, extraClass }) => {
  const extraClassBlankPosition = arrangement ? (arrangement === 'top' ? styles.pos_top : styles.pos_bottom) : ''

  return (
    <section className={`${styles.container} ${extraClassBlankPosition} ${extraClass}`}>
      <p className='text text_type_main-default text_color_inactive'>
        {arrangement ? 'Выберите булку' : 'Выберите начинку'}
      </p>
    </section>
  )
}

BlankConstructorElement.propTypes = {
  arrangement: PropTypes.oneOf(['top', 'bottom']),
  extraClass: PropTypes.string,
}

export default BlankConstructorElement
