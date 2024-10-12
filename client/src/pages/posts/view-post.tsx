import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Post, Comment } from '@codersquare/shared';
import { getOnePost, listPostComments } from '../../api';
import { ListPostCommentsPayload } from '../../types';
import { PostCard } from '../../components';
import { CommentCard } from '../../components/comment-card';

export const ViewPost = () => {
  const { id } = useParams();

  const listPostCommentsPayload: ListPostCommentsPayload = {
    jwt: localStorage.getItem('jwt') as string,
    postId: id as string,
  };

  const {
    data: postData,
    error: postError,
    isLoading: postLoading,
  } = useQuery<Post | undefined>({
    queryKey: ['post', id],
    queryFn: () =>
      getOnePost({
        id: id!,
        jwt: localStorage.getItem('jwt') as string,
      }),
  });

  /// Get post comments.
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
    return <div>Error: {postError?.message || commentsError?.message}</div>;

  return (
    <div>
      <PostCard post={postData!} buttonClasses="hidden" divClasses="m-10" />
    </div>
  );
};
