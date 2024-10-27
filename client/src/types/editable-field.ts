export interface EditableFieldProps {
  initialText: string;
  onSave: (text: string) => Promise<void>;
  placeholder?: string;
}
