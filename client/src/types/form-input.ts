export interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (field: string, value: string) => void;
  field: string;
  inputClasses?: string;
  labelClasses?: string;
  parentDivClasses?: string;
}
