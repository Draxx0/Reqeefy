import { WysiwygParams } from '@/types';
import { mergeAttributes, useEditor } from '@tiptap/react';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Underline } from '@tiptap/extension-underline';
import { StarterKit } from '@tiptap/starter-kit';
import { Heading } from '@tiptap/extension-heading';

export const useWysiwyg = ({
  wysiwygParams,
}: {
  wysiwygParams: Omit<WysiwygParams, 'wysiwygClassName'>;
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
          const classes = {
            1: 'text-xl font-bold',
            2: 'text-lg font-bold',
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              // @ts-expect-error
              class: `${classes[level]}`,
            }),
            0,
          ];
        },
      }),
      Underline,
      Placeholder.configure({
        placeholder: wysiwygParams.placeholder,
      }),
    ],
    editorProps: {
      attributes: {
        class: 'p-4 min-h-[200px] rounded-md border border-primary-500',
        // class:
        //   'focus:outline-none min-h-[96px] max-h-[250px] overflow-y-scroll border border-input bg-transparent px-3 py-2 text-sm shadow-sm rounded-md',
      },
    },
    injectCSS: true,
    onUpdate: ({ editor }) => {
      wysiwygParams.onChange(editor.getHTML());
      wysiwygParams.setCharacterCount(editor.getText().length);
    },
    autofocus: wysiwygParams.autofocus,
  });

  const clearEditor = () => editor?.commands.clearContent();

  return { editor, clearEditor };
};
