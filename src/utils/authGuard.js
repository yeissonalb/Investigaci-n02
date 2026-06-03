import { redirect } from '@tanstack/react-router'
import { TOKEN_KEY } from '../Services/AuthService'
import { decodeToken, isTokenExpired } from './decodeToken'

export function requireAdmin() {
  const token = localStorage.getItem(TOKEN_KEY)

  if (!token) {
    throw redirect({ to: '/login' })
  }

  try {
    const user = decodeToken(token)

    if (isTokenExpired(user.exp) || user.role !== 'admin') {
      localStorage.removeItem(TOKEN_KEY)
      throw redirect({ to: '/login' })
    }

    return { user }
  } catch (error) {
    if (error?.to) throw error
    localStorage.removeItem(TOKEN_KEY)
    throw redirect({ to: '/login' })
  }
}
