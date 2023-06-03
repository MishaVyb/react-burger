import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils'
import cn from 'classnames'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './styles.module.css'

interface TIconNavLinkProps {
  icon: ({ type }: TIconProps) => JSX.Element
  to: string
  title: string
}

const IconNavLink: FC<TIconNavLinkProps> = ({ icon, to, title }) => {
  return (
    <NavLink to={to} className={`pl-5 pr-5 ${styles.link}`}>
      {({ isActive, isPending }) => (
        <>
          {icon({ type: isActive ? 'primary' : 'secondary' })}
          <p className={cn('ml-2', 'text text_type_main-default', { text_color_inactive: !isActive })}>{title}</p>
        </>
      )}
    </NavLink>
  )
}

export default IconNavLink
