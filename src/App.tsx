import { BrowserRouter, Routes, Route } from "react-router-dom"

import Index from "./pages/Index"
import AuthCallback from "./pages/AuthCallback"

import ThemeProvider from "./context/Theme"

export default function App() {
  return <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
}
