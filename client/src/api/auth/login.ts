import {
  Endpoints,
  ENDPOINTS_CONFIGS,
  LoginResponse,
  ServerError,
} from '@codersquare/shared';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { LoginPayload } from '../../types';
import { HOST } from '..';

const loginEnpoint = ENDPOINTS_CONFIGS[Endpoints.login];

export const login = async (
  LoginPayload: LoginPayload,
): Promise<LoginResponse> => {
  const response = await fetch(`${HOST}${loginEnpoint.url}`, {
    method: loginEnpoint.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(LoginPayload),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorData: ServerError = data;

    const errorMessage = Array.isArray(errorData.message)
      ? errorData.message.join(', ')
      : errorData.message;

    throw new Error(errorMessage || 'Error occurred during signup');
  }

  return data;
};

export const useLoginMutation = (): UseMutationResult<
  LoginResponse,
  Error,
  LoginPayload
> => {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: (LoginPayload: LoginPayload) => login(LoginPayload),
    onSuccess: (responseData: LoginResponse) => {
      localStorage.setItem('jwt', responseData.data.token);

      return;
    },
    onError: (error: Error) => {
      console.error(error);
      return `error ${error}`;
    },
  });
};
