import { useMutation } from "@tanstack/react-query";
import { postRequest } from "../lib/api";

export const useGoogleAuth = () => {
    return useMutation({
        mutationFn: async (data) => {
            return await postRequest('/api/auth/google', data)
        }
    })
}