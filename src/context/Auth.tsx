import { 
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"
import { getAccessToken, clearTokens } from "../services/authService"

type AuthContextType = {
  isAuthenticated: boolean
  isLoading: boolean
  logout: () => void
  checkAuth: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const checkAuth = () => {
    setIsAuthenticated(!!getAccessToken())
  }

  useEffect(() => {
    checkAuth()
    setIsLoading(false)
  }, [])

  const logout = () => {
    clearTokens()
    setIsAuthenticated(false)
  }

  return <AuthContext.Provider value={{isAuthenticated, isLoading, logout, checkAuth }}>
    {children}
  </AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context
}
