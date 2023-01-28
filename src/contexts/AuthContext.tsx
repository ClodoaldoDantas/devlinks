import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { useNavigate } from 'react-router-dom'
import { http } from '../services/http'
import { errorHandler } from '../utils/errorHandler'
import { TOKEN_STORAGE } from '../utils/constants'

export interface User {
  id: string
  username: string
  bio: string | null
  avatar?: string
}

interface SignInCredentials {
  username: string
  password: string
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  updateProfile: (field: 'avatar' | 'bio', value: string) => void

  user: User | null
  appLoading: boolean
  isAuthenticated: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

interface SignInResponse {
  token: string
  user: User
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate()

  const [appLoading, setAppLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  const signIn = useCallback(
    async (credentials: SignInCredentials) => {
      try {
        const response = await http.post<SignInResponse>('session', credentials)
        const data = response.data

        setUser({ ...data.user, avatar: data.user.avatar ?? undefined })
        localStorage.setItem(TOKEN_STORAGE, response.data.token)

        navigate('/admin/links')
      } catch (err) {
        errorHandler(err)
      }
    },
    [navigate],
  )

  const signOut = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE)
    setUser(null)
  }, [])

  const updateProfile = useCallback(
    (field: 'avatar' | 'bio', value: string) => {
      setUser((state) => ({ ...state, [field]: value } as User))
    },
    [],
  )

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_STORAGE)

    if (!token) {
      setAppLoading(false)
      return
    }

    http
      .get('me')
      .then((response) => {
        const data = response.data
        setUser({ ...data, avatar: data.avatar ?? undefined })
      })
      .catch(() => {
        signOut()
      })
      .finally(() => {
        setAppLoading(false)
      })
  }, [signOut])

  return (
    <AuthContext.Provider
      value={{
        appLoading,
        isAuthenticated,
        user,
        signIn,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
