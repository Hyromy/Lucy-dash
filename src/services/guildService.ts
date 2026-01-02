import { getAccessToken } from "./authService"

export type Guild = {
  id: string
  name: string
  icon : string | null
  owner: boolean
  permissions: string
  features: string[]
}

export async function getUserGuilds(): Promise<Guild[]> {
  const token = getAccessToken()
  
  if (!token) {
    throw new Error('No hay token de acceso')
  }

  const response = await fetch('https://discord.com/api/users/@me/guilds', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error('Error al obtener guilds de Discord')
  }

  return response.json()
}

export function hasAdmin(guild: Guild): boolean {
  if (guild.owner) return true

  const adminPermission = 0x8
  const permissions = BigInt(guild.permissions)

  return (permissions & BigInt(adminPermission)) == BigInt(adminPermission)
}

export async function getGuildIconUrl(guild: Guild, size: number = 128): Promise<string> {
  if (!guild.icon) {
    return `https://cdn.discordapp.com/embed/avatars/${parseInt(guild.id) % 5}.png`
  }
  return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=${size}`
}
