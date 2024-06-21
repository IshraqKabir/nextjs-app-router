import { useMutation, useQuery } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import { login } from "@/modules/auth/mutations/login";
import {
  getUserInfoOptions,
  QUERY_KEY,
} from "@/modules/auth/queries/getUserInfo";

export const useAuth = () => {
  const queryClient = getQueryClient();
  const userQuery = useQuery(getUserInfoOptions());
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });

  return {
    user: userQuery,
    login: loginMutation,
  };
};
