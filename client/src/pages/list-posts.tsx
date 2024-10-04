import { useQuery } from '@tanstack/react-query';

import { Post } from '@codersquare/shared';
import { getAllPosts } from '../api';

export const ListPosts = () => {
  const { data, error, isLoading } = useQuery<Post[]>({
    queryKey: ['feed'],
    queryFn: getAllPosts,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading posts</div>;
  }

  return (
    <div>
      {data &&
        data.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>URL: {post.url}</p>
            <p>Author ID: {post.authorId}</p>
          </div>
        ))}
    </div>
  );
};
