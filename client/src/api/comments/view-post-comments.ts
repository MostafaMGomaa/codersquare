import { Comment, Endpoints, ENDPOINTS_CONFIGS } from '@codersquare/shared';
import { ListPostCommentsPayload } from '../../types/comments';
import { SendRequest } from '../sendRequest';

export const listPostComments = async (
  payload: ListPostCommentsPayload,
): Promise<Comment[]> => {
  const endpoint = ENDPOINTS_CONFIGS[Endpoints.listPostComments];
  const url = endpoint.url.replace(':id', payload.postId);
  return (await SendRequest(url, endpoint.method, {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${payload.jwt}`,
  })) as Comment[];
};
