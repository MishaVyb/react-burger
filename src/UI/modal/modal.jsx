import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import ModalOverlay from '../modal-overlay/modal-overlay'
import styles from './styles.module.css'

const Modal = ({ triggerElement, children }) => {
  const [show, setShow] = useState(false)

  const open = () => setShow(true)
  const close = () => setShow(false)

  useEffect(() => {
    if (show) {
      const closeByEscape = (e) => (e.key === 'Escape' ? close() : null)

      document.addEventListener('keydown', closeByEscape)
      return () => document.removeEventListener('keypress', closeByEscape)
    }
  }, [show])

  if (!show) {
    return <div onClick={open}>{triggerElement}</div>
  }

  const modalWrapper = (
    <>
      <ModalOverlay />
      <div className={styles.wrapper} onClick={close}>
        <section className={`p-10 pb-15 ${styles.modal}`} onClick={(e) => e.stopPropagation()}>
          <div className={`m-10 ${styles.close}`}>
            <CloseIcon type='primary' onClick={close} />
          </div>
          {children}
        </section>
      </div>
    </>
  )
  const modalWrapperPortal = createPortal(modalWrapper, document.getElementById('react-modals'))
  return (
    <>
      {modalWrapperPortal}
      {triggerElement}
    </>
  )
}

Modal.propTypes = {
  triggerElement: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal
