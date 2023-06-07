import { FC } from 'react'

const ErrorElement: FC<{ e?: string }> = ({ e }) => {
  return (
    <div>
      <p className='text text_type_main-default text_color_inactive'>Ошибка. Попробуйте снова.</p>
      <p className='text text_type_main-default text_color_inactive'>{e}</p>
    </div>
  )
}

export default ErrorElement
