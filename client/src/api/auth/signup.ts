import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { HOST } from '..';
import {
  ServerError,
  SignupResponse,
  ENDPOINTS_CONFIGS,
  Endpoints,
} from '@codersquare/shared';
import { SignupPayload } from '../../types';

const signEndpoint = ENDPOINTS_CONFIGS[Endpoints.signup];

export const signup = async (
  signupPayload: SignupPayload,
): Promise<SignupResponse> => {
  const response = await fetch(`${HOST}${signEndpoint.url}`, {
    method: signEndpoint.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signupPayload),
  });

  if (!response.ok) {
    const errorData: ServerError = await response.json();

    const errorMessage = Array.isArray(errorData.message)
      ? errorData.message.join(', ')
      : errorData.message;

    throw new Error(errorMessage || 'Error occurred during signup');
  }

  return await response.json();
};

export const useSignupMutation = (): UseMutationResult<
  SignupResponse,
  Error,
  SignupPayload
> => {
  return useMutation<SignupResponse, Error, SignupPayload>({
    mutationFn: (signupPayload: SignupPayload) => signup(signupPayload),
    onSuccess: (reponseData: SignupResponse) => {
      localStorage.setItem('jwt', reponseData.data.token);

      return;
    },
    onError: (error: Error) => {
      console.error(error);
      return `error ${error}`;
    },
  });
};
