const API_URL = 'https://server.survey-josha.site/api';

type Response<TData> =
  | {
      type: 'success';
      data: TData;
    }
  | {
      type: 'error';
      message: string;
    };

interface APIValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

type APIErrorDetail = APIValidationError[] | string;

interface APIErrorData {
  detail?: APIErrorDetail;
  message?: string;
}

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
    let message = response.statusText;
    try {
      const errorData = (await response.json()) as APIErrorData;

      if (Array.isArray(errorData.detail)) {
        message = errorData.detail.map((d) => d.msg).join(', ');
      } else if (typeof errorData.detail === 'string') {
        message = errorData.detail;
      } else if (typeof errorData.message === 'string') {
        message = errorData.message;
      }
    } catch (e) {
      console.error('에러 메세지 파싱 실패', e);
    }

    return {
      type: 'error',
      message,
    };
  }

  const data = (await response.json()) as TData;

  return {
    type: 'success',
    data,
  };
};
