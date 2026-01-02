import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { exchangeCodeForTokens, saveTokens, getAccessToken } from '../services/authService'
import { useAuth } from '../context/Auth'

export function useOAuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { checkAuth } = useAuth()
  const hasExchanged = useRef(false)

  useEffect(() => {
    if (getAccessToken()) {
      navigate('/')
      return
    }

    const code = searchParams.get('code')
    const error = searchParams.get('error')
    
    if (error) {
      console.error('Error de autenticación:', error)
      navigate('/')
      return
    }
    
    if (code && !hasExchanged.current) {
      hasExchanged.current = true
      
      exchangeCodeForTokens(code)
      .then(data => {
        if (data.access_token && data.refresh_token) {
          saveTokens(data.access_token, data.refresh_token)
          checkAuth()
        }
        navigate('/')
      })
      .catch(err => {
        console.error('Error al intercambiar el código:', err)
        navigate('/')
      })
    }
  }, [searchParams, navigate, checkAuth])
}
