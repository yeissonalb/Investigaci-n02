import { Link } from '@tanstack/react-router'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

const NavBar = () => {
  const { user, logout } = useContext(AuthContext)
  const isAdmin = user?.role === 'admin'

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow">
      <Link to="/" className="text-lg font-medium hover:text-gray-300">
        Home
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-300">
              {user.email} ({user.role})
            </span>
            {isAdmin && (
              <Link to="/users" className="text-lg font-medium hover:text-gray-300">
                Users
              </Link>
            )}
            <button
              onClick={logout}
              className="text-lg font-medium hover:text-gray-300"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="text-lg font-medium hover:text-gray-300">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default NavBar
