import { useNavigate } from "react-router-dom"

import { useAuth } from "../context/Auth"

import Navbar, { NavbarGroup } from "../components/Navbar"
import Button, { LoginButton, ThemeButton } from "../components/Button"

export default function Nav() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const clickHandler = () => {
    navigate("/dashboard")
  }

  return <Navbar>
    <NavbarGroup>
      {isAuthenticated && <Button onClick={clickHandler}>
        Dashboard
      </Button>}
    </NavbarGroup>
    <NavbarGroup>
      <LoginButton size={1} />
      <ThemeButton size={2} />
    </NavbarGroup>
  </Navbar>
}
