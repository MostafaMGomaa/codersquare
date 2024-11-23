import { Endpoints, ENDPOINTS_CONFIGS } from '@codersquare/shared';
import { SendRequest } from '../sendRequest';

export const getUserNotifications = async (
  jwt: string,
  limit = 10,
  skip = 0,
) => {
  const endpoint = ENDPOINTS_CONFIGS[Endpoints.getUserNotification];
  const url = `${endpoint.url}?limit=${limit}&skip=${skip}`;

  return SendRequest(url, endpoint.method, {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwt}`,
  });
};
