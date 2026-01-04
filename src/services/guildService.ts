import { Api } from "./apiClient"

export type Guild = {
  id: string
  name: string
  icon : string | null
  banner: string | null
  owner: boolean
  permissions_new?: string
  permissions?: number
  features?: string[]
}

export type GuildsResponse = {
  ok: boolean
  registered_guilds: Guild[]
  ready_to_install_guilds: Guild[]
}
export async function getUserGuilds(): Promise<GuildsResponse> {
  return Api.get('dashboard/guild/')
}

export type GuildDetails = {
  ok: boolean
  guild: Guild
}
export async function getGuildDetails(guildId: string): Promise<GuildDetails> {
  return Api.get(`dashboard/guild/${guildId}/`)
}
