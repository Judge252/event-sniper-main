import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Monitors from './pages/Monitors'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="webook-theme">
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/monitors" element={<Monitors />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
