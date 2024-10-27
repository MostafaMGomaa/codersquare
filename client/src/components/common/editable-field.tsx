import { KeyboardEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

interface EditableFieldProps {
  initialText: string;
  onSave: (text: string) => Promise<void>;
  placeholder?: string;
}

export const EditableField = ({
  initialText = '',
  onSave,
  placeholder,
}: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(initialText);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (tempText.trim() === initialText) {
      setIsEditing(false);
      return;
    }

    try {
      setIsLoading(true);
      await onSave(tempText.trim());
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTempText(initialText);
    setIsEditing(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSave();
    } else if (event.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={tempText}
          onKeyDown={handleKeyDown}
          onChange={(e) => setTempText(e.target.value)}
          className="text-gray-700 px-0 border-b border-gray-300 focus:border-orange-500 focus:outline-none bg-transparent"
          autoFocus
          maxLength={50}
          disabled={isLoading}
        />
        <button
          onClick={handleSave}
          className="text-green-600 hover:text-green-700 disabled:opacity-50"
          disabled={isLoading || !tempText.trim()}
          title="Save"
        >
          <FontAwesomeIcon icon={faCheck} className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleCancel}
          className="text-red-600 hover:text-red-700 disabled:opacity-50"
          disabled={isLoading}
          title="Cancel"
        >
          <FontAwesomeIcon icon={faXmark} className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 group">
      <span className="text-gray-700">{initialText || placeholder}</span>
      <button
        onClick={() => setIsEditing(true)}
        className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-gray-600 transition-opacity"
        title="Edit bio"
      >
        <FontAwesomeIcon icon={faPen} className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
