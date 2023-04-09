import PropTypes from 'prop-types'

const Navbar = ({ extraClass, children }) => {
  return <nav className={extraClass}>{children}</nav>
}

Navbar.propTypes = {
  extraClass: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element.isRequired), PropTypes.element]).isRequired,
}

Navbar.propsDefault = {
  extraClass: '',
}

export default Navbar
