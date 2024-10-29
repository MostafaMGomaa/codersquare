import {
  Comment,
  Endpoints,
  ENDPOINTS_CONFIGS,
  DataResult,
} from '@codersquare/shared';
import { HOST } from '..';
import { ListPostCommentsPayload } from '../../types';

export const listPostComments = async (
  payload: ListPostCommentsPayload,
): Promise<DataResult<Comment[]>> => {
  const endpoint = ENDPOINTS_CONFIGS[Endpoints.listPostComments];

  const urlWithParam = endpoint.url.replace(':id', payload.postId);

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  let { jwt, cursor, cursorField, limit } = payload;

  if (!limit) limit = 10;

  if (jwt) {
    headers['Authorization'] = `Bearer ${jwt}`;
  }

  let url = `${HOST}${urlWithParam}?limit=10`;

  if (cursor && cursorField) {
    url = `${url}&cursor=${cursor}&cursorField=${cursorField}`;
  }

  const response = await fetch(url, {
    headers,
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || 'Error fetching the post');
  }

  return response.json();
};
