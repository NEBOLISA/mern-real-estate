import { useMutation } from '@tanstack/react-query'
import { postRequest } from '../lib/api'

export const useSignIn = () => {
  return useMutation({
    mutationFn: (formData) => postRequest('/api/auth/sign-in', formData)
  })
}
