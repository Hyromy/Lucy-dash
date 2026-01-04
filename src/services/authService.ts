import { Api } from "./apiClient"

export async function exchangeCodeForTokens(code: string) {
  return Api.post('auth/discord/', { code })
}

export function saveTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem('access_token', accessToken)
  localStorage.setItem('refresh_token', refreshToken)
}

export function clearTokens() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

export function getAccessToken(): string | null {
  return localStorage.getItem('access_token')
}
