import { useMutation } from "@tanstack/react-query";
import { postRequest } from "../lib/api";

export const useSignUp = () => {
    return useMutation({
        mutationFn: async (data) => {
            return await postRequest('/api/auth/sign-up', data)
        }
    })


}