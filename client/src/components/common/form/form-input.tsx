import { FormInputProps } from '../../../types';
import { RedAsterisk } from '../red-asterisk';

export const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  onChange,
  field,
  labelClasses = '',
  inputClasses = '',
  parentDivClasses = '',
  isRequired = true,
}) => {
  return (
    <div className={`flex group ${parentDivClasses}`}>
      <label className={`${labelClasses}`} htmlFor={field}>
        {label}
        {isRequired ? <RedAsterisk /> : ''}
      </label>

      <input
        type={type}
        id={field}
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        className={inputClasses}
        required={isRequired}
      />
    </div>
  );
};
