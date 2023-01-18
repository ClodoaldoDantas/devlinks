/* eslint-disable import/export */
import { cleanup, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { afterEach } from 'vitest'
import { AuthProvider } from '../contexts/AuthContext'

afterEach(() => {
  cleanup()
})

export const AllTheProviders = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  )
}

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: AllTheProviders,
    ...options,
  })

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render }
