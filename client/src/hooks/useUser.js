import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRequest, getRequest, putRequest } from "../lib/api";

export const useUser = () => {
    return useQuery({
      queryKey: ['user'],
      queryFn: () => getRequest('http://localhost:3000/api/users/me')
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient()
  return useMutation({
      mutationFn: async (data) => {
         
      return await putRequest(
        `http://localhost:3000/api/users/me/update-user`,
        data,
        'file'
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user']
      })
    }
  
  },)
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      return await deleteRequest(
        `http://localhost:3000/api/users/me/delete`
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user']
      })
    }
  })
} 