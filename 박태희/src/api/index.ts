type Response<TData> =
  | {
      type: 'success';
      data: TData;
    }
  | {
      type: 'error';
      message: string;
    };

const API_URL = import.meta.env.VITE_API_URL;

export const api = async <TData>({
  path,
  method,
  body,
  token,
}: {
  path: string;
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: Record<string, unknown>;
  token?: string;
}): Promise<Response<TData>> => {
  const response = await fetch(`${API_URL}/${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token !== undefined ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    return {
      type: 'error',
      message: response.statusText,
    };
  }

  const data = (await response.json()) as TData;

  return {
    type: 'success',
    data,
  };
};
