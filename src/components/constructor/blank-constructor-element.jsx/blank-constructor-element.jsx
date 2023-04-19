import PropTypes from 'prop-types'

import styles from './styles.module.css'

const BlankConstructorElement = ({ arrangement, extraClass, empty }) => {
  // Render Blank Element (container with help text) or Empty Blank Element (only dashed border)
  //
  extraClass += arrangement ? (arrangement === 'top' ? ` ${styles.pos_top}` : ` ${styles.pos_bottom}`) : ''
  extraClass += empty ? ` ${styles.empty}` : ''

  return (
    <section className={`${styles.container} ${extraClass}`}>
      <p className='text text_type_main-default text_color_inactive'>
        {!empty ? (arrangement ? 'Выберите булку' : 'Выберите начинку') : ''}
      </p>
    </section>
  )
}

BlankConstructorElement.propTypes = {
  arrangement: PropTypes.oneOf(['top', 'bottom']),
  extraClass: PropTypes.string,
  empty: PropTypes.bool,
}

export default BlankConstructorElement
