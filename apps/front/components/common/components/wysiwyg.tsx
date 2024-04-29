'use client';

import { useWysiwyg } from '@/hooks/wysiwyg/useWysiwyg';
import { WysiwygParams } from '@/types';
import { Editor, EditorContent } from '@tiptap/react';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';
import { Bold, Italic, Paperclip, Underline } from 'lucide-react';

const Wysywig = ({ wysiwygParams }: { wysiwygParams: WysiwygParams }) => {
  const editor = useWysiwyg({
    wysiwygParams: {
      autofocus: wysiwygParams.autofocus,
      placeholder: wysiwygParams.placeholder,
    },
  });

  if (!editor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white border rounded-md shadow-md p-4 space-y-4">
      <MenuBar editor={editor} />

      <EditorContent
        editor={editor}
        className={wysiwygParams.wysiwygClassName}
      />
    </div>
  );
};

const MenuBar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="flex items-center gap-2 justify-between">
      <ToggleGroup type="multiple">
        <ToggleGroupItem
          value="bold"
          aria-label="Toggle bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="underline"
          aria-label="Toggle underline"
          // onClick={() => editor.chain().focus().toggleUnderline()}
        >
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <Paperclip className="w-4 h-4 hover:text-primary-700 cursor-pointer transition ease-in-out duration-300" />
    </div>
  );
};

export { Wysywig };
