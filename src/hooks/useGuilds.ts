import { useState, useEffect } from 'react'

import { getUserGuilds, type Guild } from '../services/guildService'
import { useAuth } from '../context/Auth'

export function useGuilds() {
  const [guilds, setGuilds] = useState<Guild[]>([])
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