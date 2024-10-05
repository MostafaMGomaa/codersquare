import { HOST } from '.';
import { ServerError, SignupResponse } from '@codersquare/shared';

export const signup = async (): Promise<SignupResponse | ServerError> => {
  try {
    const response = await fetch(`${HOST}auth/signup`);

    if (!response.ok) {
      const errorData: ServerError = await response.json();
      return {
        message: errorData.message || 'Error occurred during signup',
        error: errorData.error || 'Unknown error',
        statusCode: response.status.toString(),
      };
    }

    const data: SignupResponse = await response.json();
    return data;
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Unknown error',
      error: 'Network Error',
      statusCode: '500',
    };
  }
};
