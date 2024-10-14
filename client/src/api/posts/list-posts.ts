import { Post, ENDPOINTS_CONFIGS, Endpoints } from '@codersquare/shared';
import { HOST } from '../';

export const getAllPosts = async (jwt?: string): Promise<Post[]> => {
  let headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (jwt) {
    headers['Authorization'] = `Bearer ${jwt}`;
  }

  const response = await fetch(
    `${HOST}${ENDPOINTS_CONFIGS[Endpoints.listPosts].url}`,
    {
      headers,
    },
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || 'Error fetching posts');
  }

  return response.json();
};
