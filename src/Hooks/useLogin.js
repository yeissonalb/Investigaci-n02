import { useMutation } from '@tanstack/react-query'
import { login } from '../Services/AuthService'

export function useLogin() {
  return useMutation({
    mutationFn: login,
  })
}
