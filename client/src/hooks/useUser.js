import { useQuery } from "@tanstack/react-query";
import { getRequest } from "../lib/api";

export const useUser = () => {
    return useQuery({
      queryKey: ['user'],
      queryFn: () => getRequest('http://localhost:3000/api/auth/user/me')
    })
}