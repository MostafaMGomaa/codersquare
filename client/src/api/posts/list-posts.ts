import { Post, ENDPOINTS_CONFIGS, Endpoints } from '@codersquare/shared';
import { HOST } from '../';

export const getAllPosts = async (): Promise<Post[]> => {
  const response = await fetch(
    `${HOST}${ENDPOINTS_CONFIGS[Endpoints.listPosts].url}`,
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || 'Error fetching posts');
  }

  return response.json();
};