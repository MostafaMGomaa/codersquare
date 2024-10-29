import { useParams } from 'react-router-dom';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

import { Post, Comment, DataResult } from '@codersquare/shared';
import {
  PostCard,
  CommentCard,
  AddButton,
  Spinner,
  MoreButton,
} from '../../components';
import { getOnePost, listPostComments } from '../../api';
import { ErrorPage } from '../error';

export const ViewPost = () => {
  const { id } = useParams<{ id?: string }>();
  const queryClient = useQueryClient();

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
    data: commentsResponse,
    error: commentsError,
    isLoading: commentsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    DataResult<Comment[]>,
    Error,
    InfiniteData<DataResult<Comment[]>>,
    QueryKey,
    string | undefined
  >({
    queryKey: ['comments', id],
    queryFn: ({ pageParam }) =>
      listPostComments({
        jwt: localStorage.getItem('jwt') as string,
        postId: id,
        cursor: pageParam,
        cursorField: 'createdAt',
        limit: 10,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.meta?.nextCursor ?? null,
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

  function onChange(updatedPost: Partial<Post>) {
    queryClient.setQueryData(['post', id], (post: Post) => {
      return { ...post, ...updatedPost };
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

      {commentsResponse?.pages.map((page: DataResult<Comment[]>) => {
        return page.data.map((comment: Comment) => {
          return <CommentCard comment={comment} key={comment.id} />;
        });
      })}

      <AddButton postId={id} />

      <MoreButton
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        classes="m-10"
      />
    </>
  );
};
