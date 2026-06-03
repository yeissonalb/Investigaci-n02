import axios from 'axios'

export const TOKEN_KEY = 'token'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5219',
})

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common.Authorization
  }
}

export async function login({ email, password }) {
  const { data } = await api.post('/api/auth/login', { email, password })
  return data.token
}

export default api
