import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaTachometerAlt, FaTable, FaTrashAlt, FaUser } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import ThemeToggle from './ThemeToggle'

export default function Sidebar() {
  const { user, logout } = useAuth()

  const linkClass = ({ isActive }) =>
    isActive
      ? 'block px-4 py-2 rounded bg-blue-700 text-white font-medium'
      : 'block px-4 py-2 rounded text-blue-100 hover:bg-blue-800 hover:text-white transition-colors'

  return (
    <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-950 text-white dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">
      <div className="p-6 flex items-center gap-3 border-b border-blue-700 dark:border-gray-700">
        <div className="bg-white text-blue-800 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow">
          AM
        </div>
        <div>
          <div className="font-bold text-lg">Application</div>
          <div className="text-sm text-blue-200 dark:text-gray-400">Manager</div>
        </div>
      </div>

      <nav className="p-4 flex-1 space-y-2">
        <NavLink to="/" className={linkClass}>
          <FaTachometerAlt className="inline mr-2" /> Dashboard
        </NavLink>
        <NavLink to="/applications" className={linkClass}>
          <FaTable className="inline mr-2" /> Applications
        </NavLink>
        {user.role === 'Admin' && (
          <NavLink to="/deleted" className={linkClass}>
            <FaTrashAlt className="inline mr-2" /> Deleted Apps
          </NavLink>
        )}
        {user.role === 'Admin' && (
          <NavLink to="/users" className={linkClass}>
            <FaUser className="inline mr-2" /> User Management
          </NavLink>
        )}
      </nav>

      <div className="p-4 border-t border-blue-700 dark:border-gray-700 flex flex-col gap-2 items-start">
        <ThemeToggle />
        <div className="text-sm text-blue-200 dark:text-gray-400">
          Signed in as
        </div>
        <div className="font-semibold">{user.name}</div>
        <div className="text-xs text-blue-300 dark:text-gray-500 mb-3">
          ({user.role})
        </div>
        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 py-1.5 rounded text-white transition"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
