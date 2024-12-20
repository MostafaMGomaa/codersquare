import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Post } from '@codersquare/shared';

import { useCreateLikeMutation, useDeleteLikeMutation } from '../api';
import { CreateLikePayload, DeleteLikePayload } from '../types';
import { getTimeAgo } from '../utils';

export const PostCard = ({
  post,
  buttonClasses,
  divClasses,
  onChange,
}: {
  post: Post;
  buttonClasses?: string;
  divClasses?: string;
  onChange?: (post: Partial<Post>) => void;
}) => {
  const [isHover, setIsHover] = useState(false);
  const [likesCount, setLikesCount] = useState<number>(post.likeCount);

  const navigate = useNavigate();
  const location = useLocation();
  const commentCount = `${post.commentCount} comments`;
  const createLikeMutation = useCreateLikeMutation();
  const deleteLikeMutation = useDeleteLikeMutation();

  const commentClasses = twMerge(
    `px-6 py-[1px] ml-5 border border-gray-400 text-gray-400 rounded-md text-center text-sm
          hover:bg-orange-700 hover:border-transparent hover:text-white group-hover:border-orange-700`,
    buttonClasses,
  );
  const parentDivClasses = twMerge('flex flex-col mb-7', divClasses);

  const getLikeButtonClasses = () => {
    const defaultClasses =
      'like-btn text-gray-400 hover:text-orange-700 transition-colors duration-450 group-hover:text-orange-700';
    return post.likedByUserBefore
      ? twMerge(defaultClasses, 'text-orange-700')
      : defaultClasses;
  };

  const handleDisLikeButton = async () => {
    try {
      setLikesCount(likesCount - 1);

      const payload: DeleteLikePayload = {
        postId: post.id,
        jwt: localStorage.getItem('jwt') as string,
      };

      await deleteLikeMutation.mutateAsync(payload);
    } catch (err) {
      setLikesCount(likesCount + 1);

      const error =
        err instanceof Error ? err.message : 'Error while creating like';
      toast.error(error, {
        position: 'bottom-right',
      });
    }
  };

  const handleLikeButton = async () => {
    try {
      // Increase like counter
      setLikesCount(likesCount + 1);

      // send request to the server
      const createLikePayload: CreateLikePayload = {
        postId: post.id,
        jwt: localStorage.getItem('jwt') as string,
      };
      await createLikeMutation.mutateAsync(createLikePayload);
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
    if (localStorage.getItem('jwt')) {
      if (onChange) {
        if (post.likedByUserBefore) {
          onChange({ id: post.id, likedByUserBefore: false });
          handleDisLikeButton();
        } else {
          onChange({ id: post.id, likedByUserBefore: true });
          handleLikeButton();
        }
      }
    } else {
      navigate(`/signin?next=${location.pathname}`);
    }
  };

  const handleCommentButton = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div className={parentDivClasses} key={post.id}>
      <div className="top-layer flex items-center gap-x-2 mb-2 group">
        <Link to={`/post/${post.id}`} className="flex items-center gap-x-2 ">
          <FontAwesomeIcon
            icon={
              isHover || post.likedByUserBefore ? faHeartSolid : faHeartRegular
            }
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={handleToggleLikeButton}
            className={getLikeButtonClasses()}
          />
          <p className="font-bold text-gray-600 hover:text-orange-700 text-xl group-hover:text-orange-700">
            {capitalizeFirstLetter(post.title)}
          </p>
        </Link>
        <span className="text-gray-400"> ({shortenUrl(post.url)})</span>
        <button className={commentClasses} onClick={handleCommentButton}>
          {commentCount}
        </button>
      </div>

      <div className="flex items-center mx-6 gap-x-2 text-xs text-gray-400">
        <span>{`${likesCount} likes`}</span>
        <span>|</span>
        <Link
          to={`/users/${post.author.id}`}
          className="font-semibold hover:text-orange-700"
        >
          {post.author.username}
        </Link>
        <span>|</span>
        <span>{getTimeAgo(post.createdAt)}</span>
      </div>
    </div>
  );
};

const shortenUrl = (url: string): string => {
  const withProtocol = url.startsWith('http') ? url : `https://${url}`;
  const result = new URL(withProtocol).host;
  return result.startsWith('www.') ? result.split('www.')[1] : result;
};

const capitalizeFirstLetter = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
