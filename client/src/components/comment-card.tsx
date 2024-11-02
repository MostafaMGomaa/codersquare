import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Comment, DataResult } from '@codersquare/shared';
import { getTimeAgo } from '../utils';
import { useCreateCommentLikeMutation } from '../api';
import toast from 'react-hot-toast';

export const CommentCard = ({ comment }: { comment: Comment }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const [isHover, setIsHover] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likesCount || 0);
  const likeMuation = useCreateCommentLikeMutation(comment.postId);

  const username = comment.author.username;
  const jwt = localStorage.getItem('jwt') as string;

  const getLikeButtonClasses = () => {
    const defaultClasses =
      'like-btn text-gray-400 hover:text-orange-700 transition-colors duration-450 group-hover:text-orange-700';
    return comment.likedByUserBefore
      ? twMerge(defaultClasses, 'text-orange-700')
      : defaultClasses;
  };

  const onChange = (updateComment: Partial<Comment>) => {
    queryClient.setQueryData<InfiniteData<DataResult<Comment[]>>>(
      ['comments', comment.postId],
      (oldData) => {
        if (!oldData) return;

        const newPages = oldData.pages.map((page: DataResult<Comment[]>) => ({
          ...page,
          data: page.data.map((comment: Comment) =>
            comment.id === updateComment.id
              ? { ...comment, ...updateComment }
              : comment,
          ),
        }));

        return {
          ...oldData,
          pages: newPages,
        };
      },
    );
  };

  const handleLikeButton = async () => {
    try {
      setLikesCount(likesCount + 1);

      await likeMuation.mutateAsync({
        commentId: comment.id,
        jwt,
      });
    } catch (err) {
      const error =
        err instanceof Error ? err.message : 'Error while creating like';
      toast.error(error, {
        position: 'bottom-right',
      });
      setLikesCount(likesCount - 1);
    }
  };
  const handleToggleLikeButton = async (e: FormEvent) => {
    e.preventDefault();

    if (jwt) {
      if (comment.likedByUserBefore) {
        // onChange({ id: comment.id, likedByUserBefore: false });
        console.log(`Dislike ${comment.id}`);
        // handleDisLikeButton();
      } else {
        onChange({ id: comment.id, likedByUserBefore: true });
        handleLikeButton();
      }
    } else {
      navigate(`/signin?next=${location.pathname}`);
    }
  };

  return (
    <div className="comment-card container flex flex-col gap-y-1 ml-16 mt-5">
      <div className="header flex gap-x-2 items-center">
        <Link to={`/users/${comment.authorId}`}>
          <FontAwesomeIcon
            icon={
              isHover || comment.likedByUserBefore
                ? faHeartSolid
                : faHeartRegular
            }
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={getLikeButtonClasses()}
            onClick={handleToggleLikeButton}
          />

          <p className="font-bold text-gray-500 hover:text-orange-700 text-xl inline ml-2">
            {username}
          </p>
        </Link>
        <span className="text-gray-400">|</span>
        <p className="text-xs text-gray-400">{likesCount + ' likes'}</p>
        <span className="text-gray-400">|</span>
        <p className="text-xs text-gray-400">{getTimeAgo(comment.createdAt)}</p>
      </div>
      <p className="comment-body flex text-gray-400 ml-6"> {comment.comment}</p>
    </div>
  );
};
