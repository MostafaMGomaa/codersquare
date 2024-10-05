import { Post } from '@codersquare/shared/src/types';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export const PostCard = ({ post }: { post: Post }) => {
  const [isHover, setIsHover] = useState(false);
  const postHref = `post/${post.id}`;

  const commentCount = `5 comments`;
  const likesCount = `43 likes`;
  const username = 'mostafagomaa';
  const postedAt = '1 hour ago';

  return (
    <div className="flex flex-col  mb-7 " key={post.id}>
      <div className="flex items-center gap-x-2 mb-2">
        {' '}
        {/* Reduced margin from mb-3 to mb-2 */}
        <a href={postHref} className="flex items-center gap-x-2">
          <FontAwesomeIcon
            icon={isHover ? faHeartSolid : faHeartRegular}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="text-gray-400 hover:text-orange-700 transition-colors duration-450"
          />
          <p className="font-bold text-gray-600 hover:text-orange-700">
            {capitalizeFirstLetter(post.title)}
          </p>
        </a>
        <span className="text-gray-400"> ({shortenUrl(post.url)})</span>
        <button
          className="px-6 py-[1px] ml-5 border border-gray-400 text-gray-400 rounded-md text-center text-sm
          hover:bg-orange-700 hover:border-transparent hover:text-white"
        >
          {commentCount}
        </button>
      </div>
      <div className="flex items-center mx-6 gap-x-2 text-xs text-gray-400">
        <span>{likesCount}</span>
        <span>|</span>
        <a href="#" className="font-semibold hover:text-orange-700">
          {username}
        </a>
        <span>|</span>
        <span>{postedAt}</span>
      </div>
    </div>
  );
};

const shortenUrl = (url: string): string => {
  const withProtocol = url.startsWith('http') ? url : `https://${url}`;
  return new URL(withProtocol).host;
};

const capitalizeFirstLetter = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
