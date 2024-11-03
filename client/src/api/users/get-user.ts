import {
  Endpoints,
  ENDPOINTS_CONFIGS,
  GetMeResponse,
} from '@codersquare/shared';
import { SendRequest } from '../sendRequest';
import { GetUserByIdPayload } from '../../types';

export const getMe = async (jwt: string) => {
  const endpoint = ENDPOINTS_CONFIGS[Endpoints.getMe];

  return (await SendRequest(endpoint.url, endpoint.method, {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwt}`,
  })) as GetMeResponse | undefined;
};

export const getUserById = async (payload: GetUserByIdPayload) => {
  const endpoint = ENDPOINTS_CONFIGS[Endpoints.getUser];
  const url = endpoint.url.replace(':userId', payload.userId);
  return SendRequest(url, endpoint.method, {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${payload.jwt}`,
  });
};
