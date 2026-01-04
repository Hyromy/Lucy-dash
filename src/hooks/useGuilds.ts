import { useState, useEffect } from 'react'

import { 
  getUserGuilds,
  getGuildDetails,
  type GuildsResponse,
  type GuildDetails
} from '../services/guildService'
import { useAuth } from '../context/Auth'

export function useGuilds() {
  const [guilds, setGuilds] = useState<GuildsResponse>({} as GuildsResponse)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false)
      return
    }

    getUserGuilds()
      .then(data => {
        setGuilds(data)
        setError(null)
      })
      .catch(err => {
        console.error('Error al obtener guilds:', err)
        setError('No se pudieron cargar los servidores')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [isAuthenticated])

  return { guilds, isLoading, error }
}

export function useGuildDetails(guildId: string | undefined) {
  const [guild, setGuild] = useState<GuildDetails>({} as GuildDetails)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!guildId) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    getGuildDetails(guildId)
      .then(data => {
        setGuild(data)
        setError(null)
      })
      .catch(err => {
        console.error('Error al obtener detalles del guild:', err)
        setError('No se pudieron cargar los detalles del servidor')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [guildId])

  return { guild, isLoading, error }
}
