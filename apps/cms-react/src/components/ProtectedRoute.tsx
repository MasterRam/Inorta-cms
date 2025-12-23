import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

type ProtectedRouteProps = {
  children: React.ReactElement | null
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
