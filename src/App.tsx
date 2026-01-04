import { BrowserRouter, Routes, Route } from "react-router-dom"

import ProtectedRoute from "./components/ProtectedRoute"

import Index from "./pages/Index"
import Dashboard from "./pages/Dashboard"
import ManageGuild from "./pages/ManageGuild"
import AuthCallback from "./pages/AuthCallback"

import ThemeProvider from "./context/Theme"
import AuthProvider from "./context/Auth"

export default function App() {
  const protectedRoutes = [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/dashboard/:id_guild", element: <ManageGuild /> },
  ]

  return <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {protectedRoutes.map(({path, element}) => {
            return <Route key={path} path={path} element={
              <ProtectedRoute>
                {element}
              </ProtectedRoute>
            } />
          })}
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
}
