import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import ThemeToggle from '../components/ThemeToggle'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('Admin123!')
  const [err, setErr] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    const r = login({ email, password })
    if (!r.ok) setErr(r.message)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="relative bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-8 rounded-2xl shadow-lg w-full max-w-md transition-all">
        {/* Global theme toggle */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="text-center mb-6">
          <div className="text-3xl font-extrabold mb-2 text-blue-800 dark:text-blue-300">
            Application Manager
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Login to your dashboard
          </div>
        </div>

        {err && (
          <div className="bg-red-500 text-white text-sm p-2 rounded mb-3 text-center">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

        <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-gray-600 dark:text-gray-400">
          Demo credentials:
          <div className="font-mono mt-1">
            admin@example.com / Admin123!
            <br />
            user@example.com / User123!
          </div>
        </div>
      </div>
    </div>
  )
}
