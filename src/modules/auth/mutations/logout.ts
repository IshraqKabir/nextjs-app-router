import { httpClient } from "@/utils/httpClient";
import { Result } from "@/types/Result";

export const logout = async (): Promise<Result<null>> => {
  return await httpClient.post<null>(`/api/auth/logout`);
};
