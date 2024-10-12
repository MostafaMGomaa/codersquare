import { Post, ENDPOINTS_CONFIGS, Endpoints } from '@codersquare/shared';
import { ViewPostPayload } from '../../types/posts';
import { SendRequest } from '../sendRequest';

const endpoint = ENDPOINTS_CONFIGS[Endpoints.getOnePost];

export const getOnePost = async (
  payload: ViewPostPayload,
): Promise<Post | undefined> => {
  const urlWithParam = endpoint.url.replace(':id', payload.id);
  return (await SendRequest(urlWithParam, endpoint.method, {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${payload.jwt}`,
  })) as Post | undefined;
};
