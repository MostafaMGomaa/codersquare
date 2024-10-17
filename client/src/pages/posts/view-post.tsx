import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Post, Comment } from '@codersquare/shared';
import { PostCard, CommentCard, AddButton, Spinner } from '../../components';
import { getOnePost, listPostComments } from '../../api';
import { ListPostCommentsPayload } from '../../types';

export const ViewPost = () => {
  const { id } = useParams<{ id?: string }>();

  if (!id) {
    return <div>Error: Post ID is missing.</div>;
  }

  const listPostCommentsPayload: ListPostCommentsPayload = {
    jwt: localStorage.getItem('jwt') as string,
    postId: id,
  };

  const {
    data: postData,
    error: postError,
    isLoading: postLoading,
  } = useQuery<Post | undefined>({
    queryKey: ['post', id],
    queryFn: () =>
      getOnePost({
        id,
        jwt: localStorage.getItem('jwt') as string,
      }),
  });

  const {
    data: commentsData,
    error: commentsError,
    isLoading: commentsLoading,
  } = useQuery<Comment[]>({
    queryKey: ['comments', id],
    queryFn: () => listPostComments(listPostCommentsPayload),
  });

  if (postLoading || commentsLoading) {
    return <Spinner />;
  }
  if (postError || commentsError)
    return (
      <div>
        Error:{' '}
        {postError?.message || commentsError?.message || 'An error occurred.'}
      </div>
    );
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

  return (
    <>
      <PostCard
        post={postData!}
        buttonClasses="hidden"
        divClasses="m-10"
        onChange={onChange}
      />

      {commentsData?.map((comment: Comment) => (
        <CommentCard comment={comment} key={comment.id} />
      ))}

      <AddButton postId={id} />
    </>
  );
};
