import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { globalStyles } from './styles/global'

export function App() {
  globalStyles()

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
