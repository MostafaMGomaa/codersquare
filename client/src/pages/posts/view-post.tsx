import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Post, Comment } from '@codersquare/shared';
import { PostCard, CommentCard, AddButton } from '../../components';
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

  if (postLoading || commentsLoading) return <div>Loading...</div>;
  if (postError || commentsError)
    return (
      <div>
        Error:{' '}
        {postError?.message || commentsError?.message || 'An error occurred.'}
      </div>
    );

  return (
    <>
      <PostCard post={postData!} buttonClasses="hidden" divClasses="m-10" />

      {commentsData?.map((comment: Comment) => (
        <CommentCard comment={comment} key={comment.id} />
      ))}

      <AddButton postId={id} />
    </>
  );
};
