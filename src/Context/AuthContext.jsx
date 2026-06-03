import { createContext, useCallback, useEffect, useState } from 'react'
import { useLogin } from '../Hooks/useLogin'
import { setAuthToken, TOKEN_KEY } from '../Services/AuthService'
import { decodeToken, isTokenExpired } from '../utils/decodeToken'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const { mutateAsync, isPending, error, reset } = useLogin()

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setAuthToken(null)
    setToken(null)
    setUser(null)
    reset()
  }, [reset])

  const persistSession = useCallback((newToken) => {
    const decoded = decodeToken(newToken)

    if (isTokenExpired(decoded.exp)) {
      clearSession()
      throw new Error('Token expirado')
    }

    localStorage.setItem(TOKEN_KEY, newToken)
    setAuthToken(newToken)
    setToken(newToken)
    setUser(decoded)
  }, [clearSession])

  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY)
    if (!savedToken) return

    try {
      persistSession(savedToken)
    } catch {
      clearSession()
    }
  }, [clearSession, persistSession])

  const loginUser = async (email, password) => {
    reset()
    const newToken = await mutateAsync({ email, password })
    persistSession(newToken)
  }

  const logout = () => {
    clearSession()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login: loginUser,
        logout,
        loginLoading: isPending,
        loginError: error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
