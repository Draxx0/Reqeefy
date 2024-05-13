import { WysiwygParams } from '@/types';
import { mergeAttributes, useEditor } from '@tiptap/react';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Underline } from '@tiptap/extension-underline';
import { StarterKit } from '@tiptap/starter-kit';
import { Heading } from '@tiptap/extension-heading';
import { useEffect } from 'react';

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
      }),
      Heading.configure({ levels: [1, 2] }).extend({
        levels: [1, 2],
        renderHTML({ node, HTMLAttributes }) {
          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];
          const classes: Record<number, string> = {
            1: 'text-xl font-bold',
            2: 'text-lg font-bold',
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]}`,
            }),
            0,
          ];
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

  const clearEditor = () => {
    editor?.commands.clearContent();
    wysiwygParams.setCharacterCount(0);
  };

  useEffect(() => {
    if (wysiwygParams.isSubmit) {
      clearEditor();
    }
  }, [wysiwygParams.isSubmit]);

  return { editor };
};
