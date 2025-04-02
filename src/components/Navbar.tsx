import { Link } from 'react-router-dom'
import { ModeToggle } from './mode-toggle'

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold">
              WeBook Bot
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="hover:text-primary">
                Dashboard
              </Link>
              <Link to="/monitors" className="hover:text-primary">
                Monitors
              </Link>
              <Link to="/settings" className="hover:text-primary">
                Settings
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 