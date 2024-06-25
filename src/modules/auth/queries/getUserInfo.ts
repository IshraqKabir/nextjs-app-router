import { Result } from "@/types/Result";
import { UserInfo } from "../schemas/userInfoSchema";
import { httpClient } from "@/lib/httpClient";
import { queryOptions } from "@tanstack/react-query";

export const QUERY_KEY = "user-info";

export const getUserInfo = async (token?: string): Promise<Result<UserInfo>> =>
  await httpClient.GET<UserInfo>(`/api/auth/me`, { token });

export const getUserInfoOptions = (token?: string) =>
  queryOptions({
    queryKey: [QUERY_KEY],
    queryFn: () => getUserInfo(token),
  });
