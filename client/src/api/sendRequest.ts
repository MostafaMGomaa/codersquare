import { ServerError } from '@codersquare/shared';
import { HOST } from '.';
export const SendRequest = async (
  url: string,
  method: string,
  headers: HeadersInit | undefined,
  body?: string,
): Promise<any> => {
  const response = await fetch(`${HOST}${url}`, {
    method,
    headers,
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    const errorData: ServerError = data;

    const errorMessage = Array.isArray(errorData.message)
      ? errorData.message.join(', ')
      : errorData.message;

    throw new Error(errorMessage || 'Error occurred during fetching data');
  }

  return data;
};
