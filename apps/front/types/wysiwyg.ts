import { UseFormSetValue } from 'react-hook-form';

export interface WysiwygParams {
  autofocus: boolean;
  placeholder: string;
  setCharacterCount: (count: number) => void;
  onChange: (content: string) => void;
  setValue: UseFormSetValue<{
    content: string;
    uploadedFiles?: File[] | undefined;
  }>;
  isSubmit: boolean;
}
