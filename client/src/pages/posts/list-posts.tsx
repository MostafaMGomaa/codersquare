import { useState } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';

import { DataResult, Post } from '@codersquare/shared';
import { getAllPosts } from '../../api';
import { PostCard, ShadowButton, Spinner } from '../../components';
import { ErrorPage } from '../error';

export const ListPosts = () => {
  const queryClient = useQueryClient();

  let {
    data: response,
    error,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<DataResult<Post[]>>({
    queryKey: ['posts'],
    queryFn: () =>
      getAllPosts({
        jwt: localStorage.getItem('jwt') as string,
        cursor:
          response?.pages[response.pages.length - 1].meta?.nextCursor ||
          undefined,
        cursorField: 'createdAt',
        limit: 10,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.meta?.nextCursor ?? null,
  });

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
    <div className="flex flex-col gap-x-0.5 place-items-start justify-center container px-[1rem] py-4 ml-3">
      {response?.pages.map((page) =>
        page.data.map((post: Post) => (
          <PostCard key={post.id} post={post} onChange={onChange} />
        )),
      )}

      <ShadowButton
        text={
          isFetchingNextPage
            ? 'more...'
            : hasNextPage
            ? 'More'
            : 'Nothing more to load'
        }
        extraClasses="flex text-orange-800 gap-x-2 ml-0"
        icon={<FontAwesomeIcon icon={faPlus} className="text-sm w-3" />}
        onClick={() => fetchNextPage()}
      />
    </div>
  );
};
