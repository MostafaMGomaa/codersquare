import { useState } from 'react';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Comment } from '@codersquare/shared';
import { getTimeAgo } from '../utils';

export const CommentCard = ({ comment }: { comment: Comment }) => {
  const [isHover, setIsHover] = useState(false);
  const username = comment.author.email.split('@')[0];

  return (
    <div className="comment-card container flex flex-col gap-y-1 ml-16 mt-5">
      <div className="header flex gap-x-2 items-center">
        <FontAwesomeIcon
          icon={isHover ? faHeartSolid : faHeartRegular}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="like-btn text-gray-400 hover:text-orange-700 transition-colors duration-450"
        />
        <a
          className="font-bold text-gray-600 hover:text-orange-700 text-xl"
          href={`/users/${comment.authorId}`}
        >
          {username}
        </a>
        <span className="text-gray-400">|</span>
        <p className="text-xs text-gray-400">{getTimeAgo(comment.createdAt)}</p>
      </div>
      <p className="comment-body flex text-gray-400 ml-6"> {comment.comment}</p>
    </div>
  );
};
