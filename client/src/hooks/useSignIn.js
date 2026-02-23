import { useMutation } from '@tanstack/react-query'
import { postRequest } from '../lib/api'


export const useSignIn = () => {
    // const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (formData) => postRequest('/api/auth/sign-in', formData),
        // onSuccess: (data) => {
        //     queryClient.setQueryData(["user"], data)
        // }
      
  })
}
