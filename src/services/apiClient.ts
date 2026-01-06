import { getAccessToken } from "./authService"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = getAccessToken()
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    }
  }
  
  const response = await fetch(`${API_URL}/${endpoint}`, config)

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Error desconocido' }))
    throw new Error(error.detail || `Error ${response.status}`)
  }
  
  return response.json()
}

export const Api = {
  get: (endpoint: string) => 
    apiRequest(endpoint, { method: 'GET' }),
  
  post: (endpoint: string, data?: any) => 
    apiRequest(endpoint, { 
      method: 'POST', 
      body: data ? JSON.stringify(data) : undefined 
    }),

  patch: (endpoint: string, data?: any) => 
    apiRequest(endpoint, { 
      method: 'PATCH', 
      body: data ? JSON.stringify(data) : undefined 
    }),
}
