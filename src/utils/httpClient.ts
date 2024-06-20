interface BaseOptions {
  headers?: Record<string, string>;
  token?: string;
}

interface GetOptions extends BaseOptions {
  cache?: RequestCache;
}

const get = async <T>(url: string, options?: GetOptions) => {
  const headers: NonNullable<GetOptions["headers"]> = {
    "Content-Type": "application/json",
    ...options?.headers,
  };
  if (options?.token) {
    headers.Cookie = `token=${options.token}`;
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    credentials: "include",
    headers,
    cache: options?.cache,
  });
  return (await res.json()) as T;
};

const post = async <T>(url: string, body: any, options?: BaseOptions) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options?.headers,
  };
  if (options?.token) {
    headers.Cookie = options.token ? `token=${options.token}` : "";
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: "POST",
    credentials: "include",
    headers,
    body,
  });
  return (await res.json()) as T;
};

export const httpClient = {
  get,
  post,
};
