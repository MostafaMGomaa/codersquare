import { Endpoints, ENDPOINTS_CONFIGS } from '@codersquare/shared';
import { SendRequest } from '../sendRequest';

export const getUserNotifications = async (jwt: string) => {
  const endpoint = ENDPOINTS_CONFIGS[Endpoints.getUserNotification];
  return SendRequest(endpoint.url, endpoint.method, {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwt}`,
  });
};
