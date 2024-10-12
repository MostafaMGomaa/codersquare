import { useMutation, UseMutationResult } from '@tanstack/react-query';
import {
  CreateCommentResponse,
  Endpoints,
  ENDPOINTS_CONFIGS,
} from '@codersquare/shared';
import { SendRequest } from '../sendRequest';
import { CreateCommentPayload } from '../../types';

export const createComment = async (
  payload: CreateCommentPayload,
): Promise<CreateCommentResponse> => {
  try {
    const endpoint = ENDPOINTS_CONFIGS[Endpoints.createComment];
    const urlWithParam = endpoint.url.replace(':postId', payload.postId);

    return (await SendRequest(
      urlWithParam,
      endpoint.method,
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.jwt}`,
      },
      JSON.stringify({ comment: payload.comment }),
    )) as CreateCommentResponse;
  } catch (err) {
    const error =
      err instanceof Error
        ? err.message
        : 'Error occurred during creating comment';
    throw new Error(error);
  }
};

export const createCommentMutation = (): UseMutationResult<
  CreateCommentResponse,
  Error,
  CreateCommentPayload
> => {
  return useMutation<CreateCommentResponse, Error, CreateCommentPayload>({
    mutationFn: (payload: CreateCommentPayload) => createComment(payload),
    onError: (error: Error) => {
      console.error(error);
      return `error ${error}`;
    },
  });
};
