import { httpClient } from "@/lib/httpClient";
import { Result } from "@/types/Result";

export const logout = async (): Promise<Result<null>> => {
  return await httpClient.POST<null>(`/api/auth/logout`);
};
