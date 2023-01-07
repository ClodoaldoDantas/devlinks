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

interface User {
  id: string
  username: string
  bio: string
}

interface SignInCredentials {
  username: string
  password: string
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
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
        setUser(response.data.user)

        localStorage.setItem('@devlinks:token', response.data.token)
        navigate('/admin/links')
      } catch (err) {
        errorHandler(err)
      }
    },
    [navigate],
  )

  const signOut = useCallback(() => {
    localStorage.removeItem('@devlinks:token')
    setUser(null)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('@devlinks:token')

    if (!token) {
      setAppLoading(false)
      return
    }

    http
      .get('me')
      .then((response) => {
        setUser(response.data)
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
      value={{ appLoading, isAuthenticated, user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
