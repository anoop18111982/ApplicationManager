import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition ${className}`}
      title="Toggle theme"
    >
      {theme === 'dark' ? (
        <FaSun className="text-yellow-400" />
      ) : (
        <FaMoon className="text-gray-700" />
      )}
    </button>
  )
}
