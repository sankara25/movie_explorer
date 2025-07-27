import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Film, Heart, Search } from 'lucide-react'

const Header = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: Film },
    { path: '/movies', label: 'Movies', icon: Search },
    { path: '/favorites', label: 'Favorites', icon: Heart },
  ]

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary-600">
            <Film className="h-8 w-8" />
            <span>Movie Explorer</span>
          </Link>
          
          <div className="flex space-x-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === path
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
