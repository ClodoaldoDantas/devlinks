import { renderHook, act, waitFor } from '@testing-library/react'
import { userMock } from '../mocks/data'
import { TOKEN_STORAGE } from '../utils/constants'
import { AllTheProviders } from '../utils/test-utils'
import { useAuth } from './useAuth'

const setAuthToken = () => {
  localStorage.setItem(TOKEN_STORAGE, 'token-test')
}

const renderHookSync = () => {
  const { result } = renderHook(() => useAuth(), {
    wrapper: AllTheProviders,
  })

  return { result }
}

const renderHookAsync = async () => {
  setAuthToken()

  const { result } = renderHook(() => useAuth(), {
    wrapper: AllTheProviders,
  })

  expect(result.current.appLoading).toBe(true)

  await waitFor(() => {
    expect(result.current.appLoading).toBe(false)
  })

  return { result }
}

describe('useAuth hook', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('should return initial state', () => {
    const { result } = renderHookSync()

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.appLoading).toBe(false)
  })

  it('should login user', async () => {
    const { result } = renderHookSync()

    act(() => {
      result.current.signIn({
        username: 'johndoe',
        password: '123',
      })
    })

    await waitFor(() => {
      expect(result.current.user).toEqual(userMock)
      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.appLoading).toBe(false)
    })
  })

  it('should logout user', async () => {
    const { result } = await renderHookAsync()

    expect(result.current.user).toEqual(userMock)
    expect(result.current.isAuthenticated).toEqual(true)

    act(() => {
      result.current.signOut()
    })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toEqual(false)
  })

  it('should update avatar', async () => {
    const { result } = await renderHookAsync()

    expect(result.current.user?.avatar).toBeNull()

    const newAvatar = 'https://via.placeholder.com/44'

    act(() => {
      result.current.updateProfile('avatar', newAvatar)
    })

    expect(result.current.user?.avatar).toEqual(newAvatar)
  })

  it('should update bio', async () => {
    const { result } = await renderHookAsync()

    expect(result.current.user?.bio).toEqual(userMock.bio)

    const newBio = 'mobile developer'

    act(() => {
      result.current.updateProfile('bio', newBio)
    })

    expect(result.current.user?.bio).toEqual(newBio)
  })
})
