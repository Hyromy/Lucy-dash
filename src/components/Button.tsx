import type { ReactNode } from "react"
import { useTheme } from "../context/Theme"
import Icon from "./Icon"

import { useUser } from "../hooks/useUser"
import { getUserAvatarUrl, getUserDisplayName } from "../services/userService"

type ButtonProps = {
  children?: ReactNode,
  variant?: string,
  rounded?: boolean,
  onClick?: () => void,
}
export default function Button({
  children,
  variant,
  rounded = false,
  onClick
}: ButtonProps) {
  const variantClases = variant
  ? `btn-${variant}`
  : ""

  const roundedClases = rounded
  ? "rounded-4 border-2 border-secondary p-0 px-2"
  : ""

  return <button 
    className={`btn d-flex align-items-center justify-content-center ${variantClases} ${roundedClases}`}
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
  const { user, loading } = useUser()
  
  const handleLogin = () => {
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID
    const redirectUri = window.location.origin + '/' + (import.meta.env.VITE_DISCORD_REDIRECT_URI || 'auth/callback')
    const scope = 'identify email'
    
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`
    
    window.location.href = authUrl
  }
  
  if (loading) {
    return <div className="spinner-border spinner-border-sm" role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
  }
  
  if (user) {
    return <div className="d-flex align-items-center gap-2">
      <img 
        src={getUserAvatarUrl(user)} 
        alt={getUserDisplayName(user)}
        className="rounded-circle"
        width={40}
        height={40}
      />
      <span className="fw-bold">{getUserDisplayName(user)}</span>
    </div>
  }
  
  return <Button rounded onClick={handleLogin}>
    <Icon iconName="person-circle" size={size}/>
    <span className={`ms-2 fs-${size + 3}`}>Login</span>
  </Button>
}
