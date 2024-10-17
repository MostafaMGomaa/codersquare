import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

import { Post, Comment } from '@codersquare/shared';
import { PostCard, CommentCard, AddButton, Spinner } from '../../components';
import { getOnePost, listPostComments } from '../../api';
import { ListPostCommentsPayload } from '../../types';
import { ErrorPage } from '../error';

export const ViewPost = () => {
  const { id } = useParams<{ id?: string }>();

  if (!id) {
    return (
      <ErrorPage
        errorMessage="Error, Bad Request the posts"
        errorDetails="Missing post Id, please enter vaild post Id."
        statusCode={400}
        icon={
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="text-orange-600 text-8xl mb-4 animate-bounce"
          />
        }
      />
    );
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
  if (postError || commentsError) {
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
