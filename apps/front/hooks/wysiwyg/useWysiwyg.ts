import { WysiwygParams } from '@/types';
import { useEditor } from '@tiptap/react';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Bold } from '@tiptap/extension-bold';
import { Text } from '@tiptap/extension-text';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Document } from '@tiptap/extension-document';

export const useWysiwyg = ({
  wysiwygParams,
}: {
  wysiwygParams: Omit<WysiwygParams, 'wysiwygClassName'>;
}) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Placeholder.configure({
        placeholder: wysiwygParams.placeholder,
      }),
    ],
    autofocus: wysiwygParams.autofocus,
  });

  return editor;
};
