import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="p-4 bg-gray-100 flex justify-between">

      <h2 className="font-bold">
        My Website
      </h2>

      <nav className="space-x-4">

        <Link 
          to="/" 
          className="text-blue-500"
        >
          Home
        </Link>

        <Link 
          to="/about" 
          className="text-blue-500"
        >
          About
        </Link>

      </nav>

    </div>
  )
}

export default Header
