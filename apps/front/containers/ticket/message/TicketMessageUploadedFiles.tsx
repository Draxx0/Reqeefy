'use client';import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/client.index';
import { UploadFile } from '@reqeefy/types';
import { FileText, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export const TicketMessageUploadedFiles = ({ file }: { file: UploadFile }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [zoomOrigin, setZoomOrigin] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleZoomIn = (event: React.MouseEvent<HTMLDivElement>) => {
    const zoomFactor = 0.1;
    const newZoomLevel = zoomLevel + zoomFactor;
    setZoomLevel(newZoomLevel);
    updateZoomOrigin(event);
  };

  const handleResetZoom = () => {
    //TODO i should use this function when dialog close or click outside
    setZoomLevel(1);
    setZoomOrigin({ x: 0, y: 0 });
  };

  const updateZoomOrigin = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const xPercent = offsetX / rect.width;
    const yPercent = offsetY / rect.height;
    setZoomOrigin({ x: xPercent, y: yPercent });
  };

  const isFilePdf = file.file_url.includes('.pdf');

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative h-24 w-full group " title={file.file_name}>
            <div className="absolute inset-0  bg-black/50 flex justify-center items-center w-full h-full rounded-t-md z-10 opacity-0 group-hover:opacity-100 transition ease-in-out duration-300 cursor-pointer">
              <ZoomIn className="w-8 h-8 text-white z-20" />
            </div>
            {/* //TODO I should update this using file_type instead of file_url */}
            {isFilePdf ? (
              <div className="flex h-full bg-gray-300 rounded-t-md items-center justify-center">
                <FileText className="w-10 h-10 text-primary-900" />
              </div>
            ) : (
              <Image
                src={file.file_url}
                alt="file"
                layout="fill"
                className="rounded-t-md overflow-hidden"
                objectFit="cover"
                objectPosition="center"
              />
            )}
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-min ">
          <DialogHeader>
            <DialogTitle>{file.file_name}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="overflow-hidden">
            <div className="w-full h-[500px]">
              {isFilePdf ? (
                <object
                  id="myPdf"
                  type="application/pdf"
                  data={file.file_url}
                  width={'100%'}
                  height={'100%'}
                >
                  Unable to open the PDF file.
                </object>
              ) : (
                <div className="w-full h-full relative">
                  <div
                    className="absolute top-3 right-3 z-10"
                    title="Réinitialiser le zoom"
                  >
                    <Button onClick={handleResetZoom}>
                      <ZoomOut />
                    </Button>
                  </div>
                  <Image
                    src={file.file_url}
                    alt="file"
                    layout="fill"
                    className="cursor-zoom-in"
                    objectFit="cover"
                    onClick={handleZoomIn}
                    onMouseMove={updateZoomOrigin}
                    style={{
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: `${zoomOrigin.x * 100}% ${zoomOrigin.y * 100}%`,
                    }}
                  />
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <div className="space-y-2 bg-gray-200 rounded-b-md p-2">
        <p className="text-xs truncate">{file.file_name}</p>
        {/* INSERT FILE SIZE  */}
      </div>
    </div>
  );
};
