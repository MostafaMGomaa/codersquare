import { useQuery } from '@tanstack/react-query';

import { Post } from '@codersquare/shared';
import { getAllPosts } from '../api';

export const ListPosts = () => {
  const { data, error, isLoading } = useQuery<Post[]>({
    queryKey: ['feed'],
    queryFn: getAllPosts,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading posts</div>;
  }

  let count = `5 comments`;

  return (
    <div className="flex flex-col gap-y-7 gap-x-0.5 place-items-start justify-center container px-[1rem] py-4">
      {data &&
        data.map((post) => (
          <div className="flex items-center gap-1.5" key={post.id}>
            <p className="font-bold text-gray-600">{post.title}</p>
            <span className="text-gray-400"> ({post.url})</span>
            <button className="border border-gray-400 text-gray-400 px-6 py-[1px] rounded-md text-center text-sm ml-5">
              {count}
            </button>
          </div>
        ))}
    </div>
  );
};
