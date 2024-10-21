import {
  Post,
  ENDPOINTS_CONFIGS,
  Endpoints,
  DataResult,
} from '@codersquare/shared';
import { HOST } from '../';
import { GetAllPostsPayload } from '../../types/posts';

export const getAllPosts = async (
  payload: Partial<GetAllPostsPayload>,
): Promise<DataResult<Post[]>> => {
  let headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  let { jwt, cursor, cursorField, limit } = payload;

  if (!limit) limit = 10;

  if (jwt) {
    headers['Authorization'] = `Bearer ${jwt}`;
  }

  let url = `${HOST}${ENDPOINTS_CONFIGS[Endpoints.listPosts].url}?limit=10`;

  if (cursor && cursorField) {
    url = `${url}&cursor=${cursor}&cursorField=${cursorField}`;
  }

  const response = await fetch(url, {
    headers,
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || 'Error fetching posts');
  }

  return response.json();
};
