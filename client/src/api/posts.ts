import { Post } from '@codersquare/shared';

const HOST =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/'
    : 'https://www.example.com/';

export const getAllPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${HOST}posts/feed`);

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || 'Error fetching posts');
  }

  return response.json();
};

export const getOnePost = async (id: string): Promise<Post> => {
  const response = await fetch(`${HOST}posts/${id}`);

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || 'Error fetching the post');
  }

  return response.json();
};
