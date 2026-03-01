import { useMutation } from '@tanstack/react-query'
import { putRequest } from '../lib/api'

export const useUploadAvatar = () => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    
  return useMutation({
      mutationFn: async (data) => {
         
      return await putRequest(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        data,
          "file",
       
      )
    }
  })
}
