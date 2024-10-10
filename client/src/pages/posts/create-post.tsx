import { useState } from 'react';
import { FormButton, FormInput } from '../../components';
import { CreatePostPayload } from '../../types/posts';

export const CreatePost = () => {
  const [postData, setPostData] = useState<Partial<CreatePostPayload>>({
    title: '',
    url: '',
  });
  const handleCreatePostData = (inputName: string, value: string) => {
    setPostData((values: Partial<CreatePostPayload>) => ({
      ...values,
      [inputName]: value,
    }));
  };

  const inputClasses = `border border-gray-500 
          group-hover:border-orange-700 rounded bg-transparent h-9 w-[40rem] transition-colors duration-300 
          p-2 outline-none shadow-none focus:ring-0 focus:ring-transparent group-focus-within:border-orange-700`;
  const labelClasses = `font-semibold w-40 group-hover:text-orange-700 text-gray-500 group-focus-within:text-orange-700`;

  return (
    <div className="m-10 mt-24">
      <form className="flex flex-col gap-5">
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
        <FormButton text="Submit" />
      </form>
    </div>
  );
};
