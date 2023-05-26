import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import ModalOverlay from '../modal-overlay/modal-overlay'
import styles from './styles.module.css'

interface IModalProps {
  initialShow?: boolean
  triggerElement?: ReactNode
  onOpen?: () => void
  onClose?: () => void
  disable?: boolean
  children: ReactNode
}

const Modal: FC<IModalProps> = ({ initialShow, triggerElement, onOpen, onClose, disable, children }) => {
  const [show, setShow] = useState(initialShow)

  const open = () => {
    if (onOpen) onOpen()
    setShow(disable ? false : true)
  }
  const close = useCallback(() => {
    if (onClose) onClose()
    setShow(false)
  }, [onClose])

  useEffect(() => {
    if (show) {
      const closeByEscape = (e: KeyboardEvent) => (e.key === 'Escape' ? close() : null)

      document.addEventListener('keydown', closeByEscape)
      return () => document.removeEventListener('keypress', closeByEscape)
    }
  }, [show, close])

  if (!show && triggerElement) {
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
  const modalWrapperPortal = createPortal(modalWrapper, document.getElementById('react-modals') as HTMLElement)
  return (
    <>
      {modalWrapperPortal}
      {triggerElement}
    </>
  )
}

export default Modal
