import { Endpoints, ENDPOINTS_CONFIGS } from '@codersquare/shared';
import { SendRequest } from '../sendRequest';
import { CreatePostPayload } from '../../types/posts';

export const createPost = async (
  createPostPayload: CreatePostPayload,
  jwt: string,
) => {
  const endpoint = ENDPOINTS_CONFIGS[Endpoints.createPost];
  (await SendRequest(
    endpoint.url,
    endpoint.method,
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    JSON.stringify({
      title: createPostPayload.title,
      url: createPostPayload.url,
    }),
  )) as CreatePostPayload;
};
