import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Result } from "@/types/Result";
import { httpClient } from "@/utils/httpClient";

interface UserInfo {
  id: string;
  email: string;
  orgId: string;
}

const fetchUserInfo = async (token?: string): Promise<Result<UserInfo>> => {
  try {
    return {
      data: await httpClient.get<UserInfo>(`/api/auth/me`, { token }),
      error: null,
    };
  } catch (e) {
    return { data: null, error: { message: "Unauthorized" } };
  }
};

const login = async (creds: LoginCreds): Promise<Result<null>> => {
  try {
    await httpClient.post(`/api/auth/login`, JSON.stringify(creds));
    return {
      data: null,
      error: null,
    };
  } catch (e: any) {
    return {
      data: null,
      error: {
        message:
          e.response.status === 401 ? "Invalid credentials" : "Login failed",
      },
    };
  }
};

interface LoginCreds {
  email: string;
  password: string;
}

export const getFetchUserInfoOptions = (token?: string) =>
  queryOptions({
    queryKey: ["user-info"],
    queryFn: () => fetchUserInfo(token),
  });

export const useAuth = () => {
  const queryClient = useQueryClient();
  const userQuery = useQuery(getFetchUserInfoOptions());
  const loginMutation = useMutation({
    mutationFn: (creds: LoginCreds) => {
      return login(creds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
    },
  });

  return {
    user: userQuery,
    login: loginMutation,
  };
};
