"use client"

import React from 'react'
import { createContext, useState } from 'react'

export const adminContext = createContext();

export function AdminContextProvider({children}) {
    const [isAdminLogged, setIsAdminLogged] = useState(false)
  return (
    <adminContext.Provider value={{isAdminLogged, setIsAdminLogged}}>
      {children}
    </adminContext.Provider>
  )
}
