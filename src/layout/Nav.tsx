import { useNavigate } from "react-router-dom"

import { useAuth } from "../context/Auth"

import Navbar, { NavbarGroup } from "../components/Navbar"
import Button, { LoginButton, ThemeButton } from "../components/Button"

export default function Nav() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  return <Navbar>
    <NavbarGroup>
      <Button onClick={() => navigate("/")}>
        Home
      </Button>
      {
        isAuthenticated
          && <Button onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>
      }
    </NavbarGroup>
    <NavbarGroup gap={0}>
      <LoginButton size={2} />
      <ThemeButton size={2} />
    </NavbarGroup>
  </Navbar>
}
