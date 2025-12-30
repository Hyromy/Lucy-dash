import { 
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react"

type Theme = "light" | "dark"

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    if (savedTheme) return savedTheme
    
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme == "dark" ? "light" : "dark")
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
