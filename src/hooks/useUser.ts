import { useState, useEffect } from 'react'
import { getCurrentUser, type User } from '../services/userService'
import { getAccessToken } from '../services/authService'

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = getAccessToken()
    
    if (!token) {
      setLoading(false)
      return
    }

    getCurrentUser()
    .then(data => {
      setUser(data)
      setError(null)
    })
    .catch(err => {
      console.error('Error al obtener usuario:', err)
      setError(err.message)
      setUser(null)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  return { user, loading, error }
}
