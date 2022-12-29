import { SignUp } from './pages/SignUp'
import { globalStyles } from './styles/global'

export function App() {
  globalStyles()

  return (
    <>
      <SignUp />
    </>
  )
}
