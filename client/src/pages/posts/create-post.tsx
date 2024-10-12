import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { FormButton, FormInput } from '../../components';
import { CreatePostPayload } from '../../types/posts';
import { useCreatePostMutation } from '../../api';

export const CreatePost = () => {
  const [postData, setPostData] = useState<CreatePostPayload>({
    title: '',
    url: '',
    jwt: localStorage.getItem('jwt') as string,
  });
  const createPostMutation = useCreatePostMutation();
  const navigate = useNavigate();

  const handleCreatePostData = (inputName: string, value: string) => {
    setPostData((values: CreatePostPayload) => ({
      ...values,
      [inputName]: value,
    }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await createPostMutation.mutateAsync(postData);

      toast.success('Successfully creating a new post');
      setTimeout(() => {
        navigate('/');
      }, 10 * 100);
    } catch (err) {
      const error =
        err instanceof Error ? err.message : 'Failed to create post';

      toast.error(error, {
        position: 'bottom-right',
      });
    }
  };

  const inputClasses = `border border-gray-500 
          group-hover:border-orange-700 rounded bg-transparent h-9 w-[40rem] transition-colors duration-300 
          p-2 outline-none shadow-none focus:ring-0 focus:ring-transparent group-focus-within:border-orange-700`;
  const labelClasses = `font-semibold w-40 group-hover:text-orange-700 text-gray-500 group-focus-within:text-orange-700`;

  return (
    <div className="m-10 mt-24">
      <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
        <FormInput
          type="text"
          label="Title"
          field="title"
          parentDivClasses="title"
          value={postData.title!}
          labelClasses={labelClasses}
          onChange={handleCreatePostData}
          inputClasses={inputClasses}
        />
        <FormInput
          type="text"
          label="URL"
          field="url"
          parentDivClasses="text"
          value={postData.url!}
          labelClasses={labelClasses}
          onChange={handleCreatePostData}
          inputClasses={inputClasses}
        />
        <FormButton
          text="Submit"
          disabled={createPostMutation.isPending}
          isPending={createPostMutation.isPending}
          pendingText="Creating new post..."
        />
      </form>
    </div>
  );
};
