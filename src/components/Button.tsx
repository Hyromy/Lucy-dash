import type { ReactNode } from "react"
import { useTheme } from "../context/Theme"
import { useAuth } from "../context/Auth"
import Icon from "./Icon"

import { useUser } from "../hooks/useUser"
import { getUserAvatarUrl, getUserDisplayName } from "../services/userService"

import Dropdown, { DropdownItem } from "./Dropdown"

type ButtonProps = {
  children: ReactNode,
  variant?: string,
  onClick?: () => void,
}
export default function Button({
  children,
  variant,
  onClick
}: ButtonProps) {
  const variantClases = variant
  ? `btn-${variant}`
  : ""

  return <button 
    className={`btn d-flex align-items-center justify-content-center ${variantClases}`}
    onClick={onClick}>
      {children}
  </button>
}

type ThemeButtonProps = {
  size?: number,
}
export function ThemeButton({
  size = 6
}: ThemeButtonProps) {
  const { theme, toggleTheme } = useTheme()

  return <Button onClick={toggleTheme}>
    <Icon 
      iconName={theme != "dark" ? "sun-fill" : "moon-fill"}
      size={size} />
  </Button>
}

type LoginButtonProps = {
  size?: number,
}
export function LoginButton({
  size = 6
}: LoginButtonProps) {
  const { isAuthenticated, isLoading, logout } = useAuth()
  const { user } = useUser()
  
  const handleLogin = () => {
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID
    const redirectUri = window.location.origin + '/' + (import.meta.env.VITE_DISCORD_REDIRECT_URI || 'auth/callback')
    const scope = 'identify email guilds'
    
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`
    
    window.location.href = authUrl
  }
  
  if (isLoading) {
    return <div className="spinner-border spinner-border-sm" role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
  }
  
  if (isAuthenticated && user) {
    return <Dropdown align="end" options={[
      <DropdownItem text="Logout" icon="box-arrow-left" onclick={logout} variant={"danger"}/>,
    ]}>
      <img
        src={getUserAvatarUrl(user)} 
        alt={getUserDisplayName(user)}
        className="rounded-circle me-2"
        width={40}
        height={40}
      />
    </Dropdown>
  }
  
  return <Button onClick={handleLogin}>
    <Icon iconName="discord" size={size}/>
    <span className={`ms-2 fs-${size + 3}`}>Login</span>
  </Button>
}
