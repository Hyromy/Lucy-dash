import { useOAuthCallback } from "../hooks/useOAuthCallback"

export default function AuthCallback() {
  useOAuthCallback()

  return <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3">Autenticando con Discord...</p>
    </div>
  </div>
}