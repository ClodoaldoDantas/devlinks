import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { globalStyles } from './styles/global'
import { Toaster } from 'react-hot-toast'

export function App() {
  globalStyles()

  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="top-right" />
    </BrowserRouter>
  )
}
