import { Post, ENDPOINTS_CONFIGS, Endpoints } from '@codersquare/shared';
import { HOST } from '../';

const getPostEndpoint = ENDPOINTS_CONFIGS[Endpoints.getOnePost];

export const getOnePost = async (id: string): Promise<Post> => {
  const endpoint = getPostEndpoint.url.replace(':id', id);
  const response = await fetch(`${HOST}${endpoint}`);

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || 'Error fetching the post');
  }

  return response.json();
};
