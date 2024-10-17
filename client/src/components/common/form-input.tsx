import { FormInputProps } from '../../types';

export const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  onChange,
  field,
  labelClasses = '',
  inputClasses = '',
  parentDivClasses = '',
}) => {
  return (
    <div className={`flex group ${parentDivClasses}`}>
      <label className={`${labelClasses}`} htmlFor={field}>
        {label}
      </label>
      <input
        type={type}
        id={field}
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        className={inputClasses}
        required
      />
    </div>
  );
};
