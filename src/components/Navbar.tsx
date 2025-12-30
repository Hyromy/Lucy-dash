import { type ReactNode } from "react"

type NavbarProps = {
  children?: ReactNode,
}
export default function Navbar({children}: NavbarProps) {  
  return <nav className="navbar bg-body-tertiary navbar-expand-sm px-0 sticky-top">
    <div className="container-xxl d-flex justify-content-between">
      {children}
    </div>
  </nav>
}
