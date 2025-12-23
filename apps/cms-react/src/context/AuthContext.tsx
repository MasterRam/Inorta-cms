/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type LoginPayload = { email: string; password?: string } | string

type AuthContextType = {
  isAuthenticated: boolean
  login: (payload: LoginPayload) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => Boolean(localStorage.getItem('token')))

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
  }, [])

  const login = async (payload: LoginPayload) => {
    // Demo login behavior: accept either a token string or credentials
    if (typeof payload === 'string') {
      localStorage.setItem('token', payload)
    } else {
      // In a real app you would call the backend here and receive a token
      const token = `demo-token-${payload.email}`
      localStorage.setItem('token', token)
    }
    setIsAuthenticated(true)
    navigate('/admin', { replace: true })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    navigate('/login', { replace: true })
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
