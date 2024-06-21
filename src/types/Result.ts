interface Error {
  message: string;
}

export interface HttpError extends Error {
  statusCode: number;
}

export type Result<T, E = Error> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: E;
    };
