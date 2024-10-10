import { FormEvent } from 'react';

export interface FormButtonProps {
  text: string;
  disabled?: boolean;
  classes?: string;
  isPending?: boolean;
  pendingText?: string;
  handleOnClick?: (e: FormEvent) => void;
}

export interface ShadowButtonProps {
  text: string;
  extraClasses?: string;
  href?: string;
  onClick?: (e: FormEvent) => void;
}
