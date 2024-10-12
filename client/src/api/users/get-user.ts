import {
  Endpoints,
  ENDPOINTS_CONFIGS,
  GetMeResponse,
} from '@codersquare/shared';
import { SendRequest } from '../sendRequest';

export const getMe = async (jwt: string) => {
  const endpoint = ENDPOINTS_CONFIGS[Endpoints.getMe];

  return (await SendRequest(endpoint.url, endpoint.method, {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwt}`,
  })) as GetMeResponse | undefined;
};
