import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import ModalOverlay from '../modal-overlay/modal-overlay'
import styles from './styles.module.css'

const Modal = ({ triggerElement, onOpen, onClose, disable, children }) => {
  const [show, setShow] = useState(false)

  const open = () => {
    onOpen()
    setShow(disable ? false : true)
  }
  const close = useCallback(() => {
    onClose()
    setShow(false)
  }, [onClose])

  useEffect(() => {
    if (show) {
      const closeByEscape = (e) => (e.key === 'Escape' ? close() : null)

      document.addEventListener('keydown', closeByEscape)
      return () => document.removeEventListener('keypress', closeByEscape)
    }
  }, [show, close])

  if (!show) {
    return (
      <div className={styles.trigger} onClick={open}>
        {triggerElement}
      </div>
    )
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
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  disable: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

Modal.defaultProps = {
  onOpen: () => {},
  onClose: () => {},
}

export default Modal
