import { Routes, Route } from 'react-router-dom'
import { Links } from '../pages/Links'
import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/admin/links" element={<Links />} />
    </Routes>
  )
}
