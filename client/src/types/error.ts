import { ReactNode } from 'react';

export interface ErrorPageProps {
  errorMessage: string;
  errorDetails: string;
  statusCode: number;
  icon: ReactNode;
}
