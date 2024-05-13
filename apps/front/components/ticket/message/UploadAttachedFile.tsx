'use client';

import {
  Label,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/server.index';
import { Paperclip } from 'lucide-react';
import { ChangeEvent, useRef } from 'react';

export const UploadAttachedFile = ({
  onFilesChange,
}: {
  onFilesChange: (files: File[]) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileList = Array.from(event.target.files);
      onFilesChange(fileList);

      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // const handleUpload = async () => {
  //  if (!image) return;

  //  const imageAfterUpload = await uploadImage(image, 'attached-files');

  //  if (!imageAfterUpload) {
  //    renderErrorToast("Une erreur est survenue lors de l'envoi du fichier");
  //    return;
  //  }

  //  setPreviewUrl(null);
  //  setImage(null);

  //  toast.success('La photo a été téléchargée avec succès');
  // };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Label htmlFor="fileInput">
              <Paperclip className="w-4 h-4 hover:text-primary-700 cursor-pointer transition ease-in-out duration-300" />
            </Label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*, application/pdf"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
              size={1}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent align="center" side="top" className="text-gray-900">
          <div className="flex items-center gap-2">Joindre un fichier</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
