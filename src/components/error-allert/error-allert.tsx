import { FC } from 'react'

import styles from './styles.module.css'

const ErrorAllert: FC<{ detail: string }> = ({ detail }) => {
  console.error('Unexpected error received: ', detail)
  return (
    <div className={`m-10 p-10 ${styles.container}`}>
      <p className='m-2 text text_type_main-medium'>Упс :(</p>
      <p className='m-2 text text_type_main-small text_color_inactive'>
        Все сломалось. Попробуйте перезагрузить страницу.
      </p>
    </div>
  )
}

export default ErrorAllert
