import { getAccessToken } from './authService'

export interface User {
  id: string
  username: string
  discriminator: string
  avatar: string | null
  email?: string
  global_name?: string
}
export async function getCurrentUser(): Promise<User> {
  const token = getAccessToken()
  if (!token) {
    throw new Error('No hay token de acceso')
  }

  const response = await fetch('https://discord.com/api/v10/users/@me', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error('Error al obtener datos del usuario')
  }

  return response.json()
}

export function getUserAvatarUrl(user: User): string {
  if (user.avatar) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
  }
  const defaultAvatarNumber = user.discriminator == '0' 
    ? (parseInt(user.id) >> 22) % 6
    : parseInt(user.discriminator) % 5
  
  return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
}

export function getUserDisplayName(user: User): string {
  return user.global_name || user.username
}
