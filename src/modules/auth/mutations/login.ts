import { httpClient } from "@/utils/httpClient";
import { LoginSchema } from "../schemas/loginSchema";
import { Result } from "@/types/Result";

export const login = async (creds: LoginSchema): Promise<Result<null>> => {
  const { error } = await httpClient.post<null>(
    `/api/auth/login`,
    JSON.stringify(creds)
  );
  if (error && error.statusCode === 401) {
    return {
      data: null,
      error: {
        message: "Invalid credentials",
      },
    };
  }
  return {
    data: null,
    error: null,
  };
};
