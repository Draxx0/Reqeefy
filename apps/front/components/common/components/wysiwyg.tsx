'use client';

import { useWysiwyg } from '@/hooks/wysiwyg/useWysiwyg';
import { WysiwygParams } from '@/types';
import { Editor, EditorContent } from '@tiptap/react';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';
import {
  BoldIcon,
  Command,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  Paperclip,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';
import { PropsWithChildren, useEffect, useState } from 'react';

const Wysywig = ({
  autofocus,
  placeholder,
  onChange,
  children,
  onSubmit,
}: PropsWithChildren<Omit<WysiwygParams, 'setCharacterCount'>>) => {
  const [characterCount, setCharacterCount] = useState(0);

  const { editor, clearEditor } = useWysiwyg({
    wysiwygParams: {
      autofocus,
      placeholder,
      onChange,
      setCharacterCount,
    },
  });

  useEffect(() => {
    console.log('submit effect');
  }, [onSubmit]);

  if (!editor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white border rounded-md shadow-md p-4 space-y-4">
      <MenuBar editor={editor} />

      <EditorContent editor={editor} />

      <div className="flex justify-end">
        <span className="text-sm text-gray-900">
          {characterCount} characters
        </span>
      </div>

      <div className="flex justify-end">{children}</div>
    </div>
  );
};

const MenuBar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="flex items-center gap-2 justify-between">
      <ToggleGroup type="multiple" variant={'default'}>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                aria-pressed={editor.isActive('bold')}
                data-state={editor.isActive('bold') ? 'on' : 'off'}
                onClick={() => editor.chain().focus().toggleBold().run()}
                value="bold"
                aria-label="Toggle bold"
              >
                <BoldIcon size={13} />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent align="center" side="top" className="text-gray-900">
              <div className="flex items-center gap-2">
                <Command className="w-4 h-4" />
                <span>+</span>
                <span>b</span>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                aria-pressed={editor.isActive('italic')}
                data-state={editor.isActive('italic') ? 'on' : 'off'}
                onClick={() => editor.commands.toggleItalic()}
                value="italic"
                aria-label="Toggle italic"
              >
                <Italic size={13} />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent align="center" side="top" className="text-gray-900">
              <div className="flex items-center gap-2">
                <Command className="w-4 h-4" />
                <span>+</span>
                <span>i</span>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                aria-pressed={editor.isActive('underline')}
                data-state={editor.isActive('underline') ? 'on' : 'off'}
                onClick={() => editor.commands.toggleUnderline()}
                value="underline"
                aria-label="Toggle underline"
              >
                <UnderlineIcon size={13} />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent align="center" side="top" className="text-gray-900">
              <div className="flex items-center gap-2">
                <Command className="w-4 h-4" />
                <span>+</span>
                <span>u</span>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                aria-pressed={editor.isActive('heading', { level: 1 })}
                data-state={
                  editor.isActive('heading', { level: 1 }) ? 'on' : 'off'
                }
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                value="h1"
                aria-label="Toggle h1"
              >
                <Heading1 size={13} />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent align="center" side="top" className="text-gray-900">
              <div className="flex items-center gap-2">
                <Command className="w-4 h-4" />
                <span>+</span>
                <span>option</span>
                <span>+</span>
                <span>1</span>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                aria-pressed={editor.isActive('heading', { level: 2 })}
                data-state={
                  editor.isActive('heading', { level: 2 }) ? 'on' : 'off'
                }
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                value="h2"
                aria-label="Toggle h2"
              >
                <Heading2 size={13} />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent align="center" side="top" className="text-gray-900">
              <div className="flex items-center gap-2">
                <Command className="w-4 h-4" />
                <span>+</span>
                <span>option</span>
                <span>+</span>
                <span>2</span>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                aria-pressed={editor.isActive('bulletList')}
                data-state={editor.isActive('bulletList') ? 'on' : 'off'}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                value="bullet list"
                aria-label="Toggle bullet list"
              >
                <List size={13} />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent align="center" side="top" className="text-gray-900">
              <div className="flex items-center gap-2">
                <Command className="w-4 h-4" />
                <span>+</span>
                <span>shift</span>
                <span>+</span>
                <span>8</span>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value="strike"
                aria-label="Toggle strike"
                aria-pressed={editor.isActive('strike')}
                data-state={editor.isActive('strike') ? 'on' : 'off'}
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                <StrikethroughIcon size={13} />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent align="center" side="top" className="text-gray-900">
              <div className="flex items-center gap-2">
                <Command className="w-4 h-4" />
                <span>+</span>
                <span>shift</span>
                <span>+</span>
                <span>s</span>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ToggleGroup>

      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Paperclip className="w-4 h-4 hover:text-primary-700 cursor-pointer transition ease-in-out duration-300" />
          </TooltipTrigger>
          <TooltipContent align="center" side="top" className="text-gray-900">
            <div className="flex items-center gap-2">Joindre un fichier</div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export { Wysywig };
