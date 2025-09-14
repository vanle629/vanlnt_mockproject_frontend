import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/authContext'

export default function Header(){
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout(){
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">SoleMate</Link>
        <nav className="space-x-4">
          <Link to="/search" className="text-sm">Search</Link>
          <Link to="/cart" className="text-sm">Cart</Link>
          <Link to="/account" className="text-sm">Account</Link>
          <Link to="/admin" className="text-sm">Admin</Link>
          {isAuthenticated && (
            <button onClick={handleLogout} className="text-sm">Logout</button>
          )}
        </nav>
      </div>
    </header>
  )
}
