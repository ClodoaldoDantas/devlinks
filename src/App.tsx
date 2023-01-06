import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { globalStyles } from './styles/global'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export function App() {
  globalStyles()

  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer position="top-right" theme="colored" />
    </BrowserRouter>
  )
}
