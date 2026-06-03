import { jwtDecode } from 'jwt-decode'

const EMAIL_CLAIM = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
const ROLE_CLAIM = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'

export function decodeToken(token) {
  const payload = jwtDecode(token)

  return {
    email: payload.email ?? payload[EMAIL_CLAIM] ?? '',
    role: payload.role ?? payload[ROLE_CLAIM] ?? '',
    exp: payload.exp,
  }
}

export function isTokenExpired(exp) {
  if (!exp) return true
  return exp * 1000 < Date.now()
}
