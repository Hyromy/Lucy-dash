import { BrowserRouter, Routes, Route } from "react-router-dom"

import ProtectedRoute from "./components/ProtectedRoute"

import Index from "./pages/Index"
import Dashboard from "./pages/Dashboard"
import AuthCallback from "./pages/AuthCallback"

import ThemeProvider from "./context/Theme"
import AuthProvider from "./context/Auth"

export default function App() {
  return <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
}
