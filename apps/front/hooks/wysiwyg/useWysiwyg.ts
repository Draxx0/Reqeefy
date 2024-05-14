import { WysiwygParams } from '@/types';
import { useEditor } from '@tiptap/react';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Underline } from '@tiptap/extension-underline';
import { Link } from '@tiptap/extension-link';
import { StarterKit } from '@tiptap/starter-kit';
import { useCallback, useEffect } from 'react';

export const useWysiwyg = ({
  wysiwygParams,
}: {
  wysiwygParams: Omit<WysiwygParams, 'setValue'>;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bold: {
          HTMLAttributes: {
            class: 'font-bold',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'message-bullet-list',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'mb-2',
          },
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: 'underline text-primary-700',
        },
      }),
      Underline.configure({
        HTMLAttributes: {
          class: 'underline',
        },
      }),
      Placeholder.configure({
        placeholder: wysiwygParams.placeholder,
      }),
    ],
    editorProps: {
      attributes: {
        class: 'p-4 min-h-[200px] rounded-md border border-gray-700',
      },
    },
    injectCSS: true,
    onUpdate: ({ editor }) => {
      wysiwygParams.onChange(editor.getHTML());
      wysiwygParams.setCharacterCount(editor.getText().length);
    },
    autofocus: wysiwygParams.autofocus,
  });

  const clearEditor = useCallback(() => {
    editor?.commands.clearContent();
    wysiwygParams.setCharacterCount(0);
  }, [editor, wysiwygParams]);

  useEffect(() => {
    if (wysiwygParams.isSubmit) {
      console.log('clear editor');
      clearEditor();
    }
  }, [wysiwygParams.isSubmit, clearEditor]);

  return { editor };
};
