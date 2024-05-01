export interface WysiwygParams {
  autofocus: boolean;
  placeholder: string;
  setCharacterCount: (count: number) => void;
  onChange: (content: string) => void;
  onSubmit?: () => void;
}
