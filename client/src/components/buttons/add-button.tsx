import { ChangeEvent, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from '@tanstack/react-query'; // Import this
import { FormButton } from './form-button';
import { createCommentMutation } from '../../api';
import { CreateCommentPayload } from '../../types';

export const AddButton = ({ postId }: { postId: string }) => {
  const [commentData, setCommentData] = useState<CreateCommentPayload>({
    comment: '',
    postId,
    jwt: localStorage.getItem('jwt') as string,
  });
  const [activeAddBtn, setActiveButton] = useState(false);

  const queryClient = useQueryClient(); // Get queryClient from useQueryClient
  const mutation = createCommentMutation();

  const handleCreateCommentData = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setCommentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await mutation.mutateAsync(commentData, {
        onSuccess: () => {
          toast.success('Successfully created a new comment');
          setActiveButton(false);

          queryClient.invalidateQueries({
            queryKey: ['comments', postId],
          });
        },
      });
    } catch (err) {
      const error =
        err instanceof Error ? err.message : 'Failed to create comment';
      toast.error(error, {
        position: 'bottom-right',
      });
    }
  };

  return (
    <>
      <button
        className={`fixed bottom-10 right-10 rounded-full bg-orange-800 w-16 h-16 text-white 
        hover:bg-orange-700 transition-colors duration-300 ease-in-out ${
          activeAddBtn ? 'hidden' : ''
        }`}
        onClick={() => setActiveButton(true)}
      >
        <FontAwesomeIcon icon={faPlus} className="text-3xl" />
      </button>

      {activeAddBtn && (
        <form
          className="fixed bottom-10 right-10 w-[22rem] max-w-[90vw] h-[25rem] p-4 flex flex-col bg-white shadow-lg border border-gray-300 rounded-lg"
          onSubmit={handleFormSubmit}
        >
          <button
            type="button"
            className="absolute top-0 right-1 p-1 text-gray-500 hover:text-gray-700 transition-colors duration-300 "
            onClick={() => setActiveButton(false)}
          >
            <FontAwesomeIcon icon={faTimes} className="" />
          </button>

          <textarea
            name="comment"
            id="comment-txt"
            rows={6}
            className="mr-2 p-4 flex-grow overflow-auto resize-none transition-colors duration-300 rounded-md
            outline-none shadow-none focus:ring-0 focus:ring-transparent border
            border-gray-200 focus:border-orange-800 hover:border-orange-800"
            autoFocus
            onFocus={(e) => e.target.setSelectionRange(0, 0)}
            placeholder="Write your comment here..."
            onChange={handleCreateCommentData}
            required
          />

          <FormButton text="Submit" classes="m-4 self-end" />
        </form>
      )}
    </>
  );
};
