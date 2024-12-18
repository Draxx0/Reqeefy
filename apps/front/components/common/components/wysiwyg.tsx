'use client';
import { UploadAttachedFile } from '@/components/client.index';
import { useCreateLink } from '@/hooks/wysiwyg';
import { useWysiwyg } from '@/hooks/wysiwyg/useWysiwyg';
import { WysiwygParams } from '@/types';
import { Editor, EditorContent } from '@tiptap/react';
import {
  BoldIcon,
  CircleX,
  Command,
  FileText,
  Italic,
  List,
  UnderlineIcon,
} from 'lucide-react';
import Image from 'next/image';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

const Wysywig = ({
  autofocus,
  placeholder,
  onChange,
  isSubmit,
  setValue,
  children,
}: PropsWithChildren<Omit<WysiwygParams, 'setCharacterCount'>>) => {
  const [characterCount, setCharacterCount] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    setValue('uploadedFiles', files);
  }, [files]);

  useEffect(() => {
    if (isSubmit) {
      setFiles([]);
      setPreviewUrls([]);
    }
  }, [isSubmit]);

  const { editor } = useWysiwyg({
    wysiwygParams: {
      autofocus,
      placeholder,
      onChange,
      isSubmit,
      setCharacterCount,
    },
  });

  const handleFilesChange = useCallback(
    (newFiles: File[]) => {
      const filteredNewFiles = newFiles.filter(
        (newFile) =>
          !files.some(
            (file) => file.name === newFile.name && file.size === newFile.size
          )
      );

      if (filteredNewFiles.length > 0) {
        const updatedFiles = [...files, ...filteredNewFiles];
        setFiles(updatedFiles);

        const newUrls = filteredNewFiles.map((file) =>
          URL.createObjectURL(file)
        );

        setPreviewUrls([...previewUrls, ...newUrls]);

        toast.success('Fichier(s) ajouté(s) avec succès');
      }
    },
    [files, previewUrls]
  );

  const handleDeleteFile = useCallback(
    (index: number) => {
      URL.revokeObjectURL(previewUrls[index]);

      const newFiles = files.filter((_, i) => i !== index);
      const newPreviewUrls = previewUrls.filter((_, i) => i !== index);

      setFiles(newFiles);
      setPreviewUrls(newPreviewUrls);
      toast.success('Fichier(s) supprimé(s) avec succès');
    },
    [files, previewUrls]
  );

  if (!editor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white border rounded-md shadow-md p-4 space-y-4">
      <MenuBar editor={editor} handleFilesChange={handleFilesChange} />

      <EditorContent editor={editor} />

      <div className="flex justify-end">
        <span className="text-sm text-gray-900">
          {characterCount} caractères
        </span>
      </div>

      <div className="grid grid-cols-6 gap-6">
        {previewUrls.map((url, index) => (
          <ImagePreview
            key={index}
            previewUrl={url}
            index={index}
            file={files[index]}
            onDelete={handleDeleteFile}
          />
        ))}
      </div>

      <div className="flex justify-end">{children}</div>
    </div>
  );
};

const MenuBar = ({
  editor,
  handleFilesChange,
}: {
  editor: Editor;
  handleFilesChange: (files: File[]) => void;
}) => {
  const { form, isPending, handleSubmit } = useCreateLink({
    editor,
  });

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

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

        {/* <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Dialog>
                <DialogTrigger asChild>
                  <ToggleGroupItem
                    aria-pressed={editor.isActive('link')}
                    data-state={editor.isActive('link') ? 'on' : 'off'}
                    value="link"
                    aria-label="Activer le lien"
                  >
                    <Link size={13} />
                  </ToggleGroupItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Créer un lien</DialogTitle>
                    <DialogDescription>
                      Ajoutez un lien vers une page web
                    </DialogDescription>
                  </DialogHeader>

                  <Form {...form}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold">
                              Texte du lien
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="google.fr"
                                type="text"
                                {...field}
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold">
                              URL
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://google.fr"
                                type="url"
                                {...field}
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end gap-4">
              
                        <Button
                          disabled={!form.formState.isValid || isPending}
                          isLoading={isPending}
                          type="submit"
                        >
                          Insérer
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
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
        </TooltipProvider> */}
      </ToggleGroup>

      <UploadAttachedFile onFilesChange={handleFilesChange} />
    </div>
  );
};

const ImagePreview = ({
  previewUrl,
  index,
  file,
  onDelete,
}: {
  previewUrl: string;
  index: number;
  file: File;
  onDelete: (index: number) => void;
}) => (
  <div className="relative h-32 w-full">
    {file.type.includes('image') ? (
      <Image
        title={file.name}
        src={previewUrl}
        alt="Image"
        width={0}
        height={0}
        className="border border-primary-900 rounded-md w-full h-full object-center object-cover"
      />
    ) : (
      <div
        title={file.name}
        className="h-full w-full flex flex-col  gap-2 items-center border border-primary-900 justify-center bg-gray-200 rounded-md"
      >
        <FileText className="w-12 h-12 text-primary-900" />
        <p className="text-xs line-clamp-1 w-full px-5">{file.name}</p>
      </div>
    )}
    <button
      onClick={() => onDelete(index)}
      className="absolute -top-1 -right-1 active:translate-y-1 transition ease-in-out duration-300 bg-red-500 text-white p-1 rounded-full"
      aria-label="Supprimer l'image"
    >
      <CircleX className="w-4 h-4" />
    </button>
  </div>
);

export { Wysywig };
