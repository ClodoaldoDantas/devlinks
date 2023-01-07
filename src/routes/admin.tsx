import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Header } from '../components/Header'
import { useAuth } from '../hooks/useAuth'

export function AdminRoutes() {
  const { appLoading, isAuthenticated } = useAuth()
  const location = useLocation()

  if (appLoading) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
