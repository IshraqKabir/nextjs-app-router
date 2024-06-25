import type { HttpError, Result } from "@/types/Result";

interface BaseOptions {
  headers?: Record<string, string>;
  token?: string;
}

interface GetOptions extends BaseOptions {
  cache?: RequestCache;
}

const GET = async <T>(
  url: string,
  options?: GetOptions
): Promise<Result<T>> => {
  const headers: NonNullable<GetOptions["headers"]> = {
    "Content-Type": "application/json",
    ...options?.headers,
  };
  if (options?.token) {
    headers.Cookie = `token=${options.token}`;
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      credentials: "include",
      headers,
      cache: options?.cache || "no-store",
    });
    return await handleResponse<T>(res);
  } catch (e: any) {
    return { data: null, error: { message: e.message } };
  }
};

const POST = async <T>(
  url: string,
  body?: any,
  options?: BaseOptions
): Promise<Result<T, HttpError>> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options?.headers,
  };
  if (options?.token) {
    headers.Cookie = options.token ? `token=${options.token}` : "";
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: "POST",
      credentials: "include",
      headers,
      body,
    });
    return await handleResponse<T>(res);
  } catch (e: any) {
    return {
      data: null,
      error: {
        message: e.message,
        statusCode: 400,
      },
    };
  }
};

const handleResponse = async <T>(
  res: Response
): Promise<Result<T, HttpError>> => {
  if (res.status < 200 || res.status >= 400) {
    return {
      data: null,
      error: {
        message: res.status >= 500 ? "Server error" : "Unhandled error occured",
        statusCode: res.status,
      },
    };
  }
  return {
    data: (await res.json()) as T,
    error: null,
  };
};

const DELETE = async <T>(
  url: string,
  options?: BaseOptions
): Promise<Result<T, HttpError>> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options?.headers,
  };
  if (options?.token) {
    headers.Cookie = options.token ? `token=${options.token}` : "";
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: "DELETE",
      credentials: "include",
      headers,
    });
    return await handleResponse<T>(res);
  } catch (e: any) {
    return {
      data: null,
      error: {
        message: e.message,
        statusCode: 400,
      },
    };
  }
};

export const httpClient = {
  GET,
  POST,
  DELETE,
};
