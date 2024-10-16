import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Post } from '@codersquare/shared/src/types';
import { getAllPosts } from '../../api';
import { PostCard } from '../../components';

export const ListPosts = () => {
  const { data, error, isLoading, refetch } = useQuery<Post[]>({
    queryKey: ['feed'],
    queryFn: () => getAllPosts(localStorage.getItem('jwt') as string),
  });
  const queryClient = useQueryClient();

  function onChange(updatedPost: Post) {
    queryClient.setQueryData(['feed'], (posts: Post[]) => {
      return posts.map((post: Post) => {
        if (post.id === updatedPost.id) {
          return { ...post, ...updatedPost };
        }
        return post;
      });
    });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading posts</div>;
  }

  return (
    <div className="flex flex-col  gap-x-0.5 place-items-start justify-center container px-[1rem] py-4">
      {data &&
        data.map((post: Post) => (
          <PostCard
            key={post.id}
            post={post}
            refetch={refetch}
            onChange={onChange}
          />
        ))}
    </div>
  );
};
