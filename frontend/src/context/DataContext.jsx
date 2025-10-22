import React, { createContext, useContext, useState, useEffect } from 'react'
import { mockApplications } from '../mockData'
const DataContext = createContext()
export const DataProvider = ({children})=>{
  const stored = localStorage.getItem('am_apps')
  const [apps, setApps] = useState(stored ? JSON.parse(stored) : mockApplications)

  useEffect(()=>{ localStorage.setItem('am_apps', JSON.stringify(apps)) }, [apps])

  const addApp = (app)=>{
    const nextId = apps.length ? Math.max(...apps.map(a=>a.id))+1 : 1
    setApps([{...app, id: nextId, isDeleted:false}, ...apps])
  }
  const updateApp = (id, updates)=>{
    setApps(apps.map(a=> a.id===id ? {...a, ...updates} : a))
  }
  const softDelete = (id)=>{
    setApps(apps.map(a=> a.id===id ? {...a, isDeleted:true} : a))
  }
  const restore = (id)=>{
    setApps(apps.map(a=> a.id===id ? {...a, isDeleted:false} : a))
  }
  const hardDelete = (id)=>{
    setApps(apps.filter(a=> a.id!==id))
  }
  return <DataContext.Provider value={{apps, addApp, updateApp, softDelete, restore, hardDelete}}>
    {children}
  </DataContext.Provider>
}
export const useData = ()=> useContext(DataContext)
