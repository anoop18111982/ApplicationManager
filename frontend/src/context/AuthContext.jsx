import React, { createContext, useContext, useState } from 'react'
import { mockUsers } from '../mockData'
const AuthContext = createContext()
export const AuthProvider = ({children})=>{
  const stored = localStorage.getItem('am_user')
  const [user, setUser] = useState(stored ? JSON.parse(stored) : null)
  const login = ({email, password})=>{
    const found = mockUsers.find(u=>u.email===email && u.password===password)
    if(found){
      const tokenLike = btoa(email + '|' + found.role)
      const u = { email: found.email, role: found.role, name: found.name, token: tokenLike }
      localStorage.setItem('am_user', JSON.stringify(u))
      setUser(u)
      return { ok: true }
    }
    return { ok: false, message: 'Invalid creds' }
  }
  const logout = ()=>{ localStorage.removeItem('am_user'); setUser(null) }
  return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
}
export const useAuth = ()=> useContext(AuthContext)
