import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

import { Post } from '@codersquare/shared/src/types';
import { getAllPosts } from '../../api';
import { PostCard, Spinner } from '../../components';
import { ErrorPage } from '../error';

export const ListPosts = () => {
  const { data, error, isLoading } = useQuery<Post[]>({
    queryKey: ['feed'],
    queryFn: () => getAllPosts(localStorage.getItem('jwt') as string),
  });
  const queryClient = useQueryClient();

  function onChange(updatedPost: Partial<Post>) {
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
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorPage
        errorMessage="Error, fetching the data"
        errorDetails="Sorry, we can't fetch data, please try again later."
        statusCode={500}
        icon={
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="text-orange-600 text-8xl mb-4 animate-bounce"
          />
        }
      />
    );
  }

  return (
    <div className="flex flex-col  gap-x-0.5 place-items-start justify-center container px-[1rem] py-4">
      {data &&
        data.map((post: Post) => (
          <PostCard key={post.id} post={post} onChange={onChange} />
        ))}
    </div>
  );
};
