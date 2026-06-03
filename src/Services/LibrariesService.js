import api from './AuthService'

export async function fetchLibraries() {
  const { data } = await api.get('/api/libraries')
  return data
}
