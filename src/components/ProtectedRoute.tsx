import { type ReactNode } from "react"
import { Navigate } from "react-router-dom"

import { useAuth } from "../context/Auth"

type Props = {
  children: ReactNode
}
export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}
