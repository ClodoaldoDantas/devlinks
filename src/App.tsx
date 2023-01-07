import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { globalStyles } from './styles/global'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { AuthProvider } from './contexts/AuthContext'

export function App() {
  globalStyles()

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <ToastContainer position="top-right" theme="colored" />
    </BrowserRouter>
  )
}
