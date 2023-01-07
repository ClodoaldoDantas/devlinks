import { Routes, Route } from 'react-router-dom'
import { Links } from '../pages/Links'
import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'
import { AdminRoutes } from './admin'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route path="/admin" element={<AdminRoutes />}>
        <Route path="links" element={<Links />} />
      </Route>
    </Routes>
  )
}
