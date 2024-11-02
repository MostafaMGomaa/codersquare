import toast from 'react-hot-toast';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import {
  DeleteLikeResponse,
  Endpoints,
  ENDPOINTS_CONFIGS,
} from '@codersquare/shared';
import { DislikeCommentPayload } from '../../../types';
import { SendRequest } from '../../sendRequest';

export const dislike = async (
  payload: DislikeCommentPayload,
): Promise<DeleteLikeResponse> => {
  const endpoint = ENDPOINTS_CONFIGS[Endpoints.dislikeComment];
  const url = endpoint.url.replace(':commentId', payload.commentId);
  return SendRequest(url, endpoint.method, {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${payload.jwt}`,
  });
};

export const useDislikeComment = (
  postId: string,
): UseMutationResult<DeleteLikeResponse, Error, DislikeCommentPayload> => {
  const queryClient = useQueryClient();

  return useMutation<DeleteLikeResponse, Error, DislikeCommentPayload>({
    mutationFn: (payload: DislikeCommentPayload) => dislike(payload),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['comments', postId],
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
