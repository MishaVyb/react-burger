import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { createPortal } from 'react-dom'
import styles from './styles.module.css'

/* eslint react/prop-types: 0 */
const Modal = ({ triggerElement, children }) => {
  const [show, setShow] = useState(false)

  const open = () => setShow(true)
  const close = () => setShow(false)

  useEffect(() => {
    const closeByEscape = (e) => (e.key === 'Escape' ? close() : null)

    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keypress', closeByEscape)
  }, [])

  const modalWrapper = (
    <>
      <div className={styles.overlay}></div>
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

  const triggerElementControl = <div onClick={open}>{triggerElement}</div>

  return show ? (
    <>
      {modalWrapperPortal}
      {triggerElementControl}
    </>
  ) : (
    triggerElementControl
  )
}

export default Modal
