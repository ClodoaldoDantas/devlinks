import { SignIn } from './pages/SignIn'
import { globalStyles } from './styles/global'

export function App() {
  globalStyles()

  return (
    <>
      <SignIn />
    </>
  )
}
