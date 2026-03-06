import { useMutation, useQuery } from "@tanstack/react-query"
import { getRequest, postRequest } from "../lib/api"

export const useListing = () => {
    return useMutation({
      mutationFn: (formData) => postRequest('http://localhost:3000/api/listings/', formData)
    })
}

export const useGetListing = () => { 
    return useQuery({
        queryKey: ['listings'],
        queryFn: () => getRequest('http://localhost:3000/api/listings')
    })
}

export const useGetListingById = (id) => {
    return useQuery({
        queryKey: ['listing', id],
        queryFn: () => getRequest(`http://localhost:3000/api/listings/${id}`)
    })
}