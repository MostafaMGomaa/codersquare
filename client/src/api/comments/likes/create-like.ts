import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { DataResult, Endpoints, ENDPOINTS_CONFIGS } from '@codersquare/shared';
import { CommentLike, CreateCommentLikePayload } from '../../../types';
import { SendRequest } from '../../sendRequest';
import toast from 'react-hot-toast';

export const createCommentLikes = (
  payload: CreateCommentLikePayload,
): Promise<DataResult<CommentLike>> => {
  const endpoint = ENDPOINTS_CONFIGS[Endpoints.createCommentLike];
  const url = endpoint.url.replace(':commentId', payload.commentId);

  return SendRequest(url, endpoint.method, {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${payload.jwt}`,
  });
};

export const useCreateCommentLikeMutation = (
  postId: string,
): UseMutationResult<
  DataResult<CommentLike>,
  Error,
  CreateCommentLikePayload
> => {
  const queryClient = useQueryClient();
  const fetchCommentsQK = ['comments', postId];

  return useMutation({
    mutationFn: (payload: CreateCommentLikePayload) =>
      createCommentLikes(payload),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['post', postId],
      });
      await queryClient.cancelQueries({
        queryKey: fetchCommentsQK,
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message, {
        position: 'bottom-right',
      });
    },
  });
};
