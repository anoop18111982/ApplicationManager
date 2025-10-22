import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'
import DeletedApps from './pages/DeletedApps'
import Users from './pages/Users'
import Sidebar from './components/Sidebar'
import { useAuth } from './context/AuthContext'

export default function App(){
  const { user } = useAuth()
  if(!user) {
    return <Routes><Route path='/*' element={<Login/>} /></Routes>
  }
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/applications" element={<Applications/>} />
          <Route path="/deleted" element={<DeletedApps/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      </div>
    </div>
  )
}
