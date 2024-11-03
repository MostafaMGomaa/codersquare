import { User } from '@codersquare/shared';
import { formatDate } from '../utils/date';
import { EditableField } from './common';

export const UserInfo = ({
  data,
  handleBioUpdate,
  isEditable,
}: {
  data: User | undefined;
  handleBioUpdate?: (newBio: string) => Promise<void>;
  isEditable: boolean;
}) => {
  return (
    <div className="container flex flex-col mt-20 ml-20 gap-y-4">
      <div className="username-container flex gap-x-5 items-start">
        <p className="text-gray-400 w-24">User: </p>
        <span className="text-gray-700">{data?.username}</span>
      </div>
      <div className="created-container flex gap-x-5 items-start">
        <p className="text-gray-400 w-24">Created: </p>
        <span className="text-gray-700">
          {formatDate(new Date(data?.createdAt!))}
        </span>
      </div>
      <div className="points-container flex gap-x-5 items-start">
        <p className="text-gray-400 w-24">Points: </p>
        <span className="text-gray-700">0</span>
      </div>
      <div className="about-container flex gap-x-5 items-start">
        <p className="text-gray-400 w-24">About: </p>
        <EditableField
          initialText={data?.about || ''}
          onSave={handleBioUpdate}
          placeholder="Add bio..."
          isEditable={isEditable}
        />
      </div>
    </div>
  );
};
