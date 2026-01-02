import { useState, useEffect, useRef } from 'react'
import { getCurrentUser, type User } from '../services/userService'
import { getAccessToken } from '../services/authService'

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) {
      return
    }

    const token = getAccessToken()
    
    if (!token) {
      setLoading(false)
      return
    }

    hasFetched.current = true

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
