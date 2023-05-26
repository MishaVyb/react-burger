import { FC, ReactNode } from 'react'

interface TNavbarProps {
  extraClass?: string
  children: ReactNode
}

const Navbar: FC<TNavbarProps> = ({ extraClass, children }) => {
  return <nav className={extraClass}>{children}</nav>
}

export default Navbar
