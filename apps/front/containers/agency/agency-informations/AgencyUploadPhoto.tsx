'use client';
import { Button, buttonVariants } from '@/components/client.index';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Label,
} from '@/components/server.index';
import supabase from '@/lib/supabaseClient';
import { agencyService, uploadImage } from '@/services';
import { renderErrorToast } from '@/utils';
import { Agency } from '@reqeefy/types';
import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';
export const AgencyUploadPhoto = ({ agency }: { agency: Agency }) => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const query = useQueryClient();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const imageAfterUpload = await uploadImage(image, 'agency-avatars');

    if (!imageAfterUpload) {
      renderErrorToast("Une erreur est survenue lors de l'envoi du fichier");
      return;
    }

    setPreviewUrl(null);
    setImage(null);

    toast.success('La photo a été téléchargée avec succès');

    await agencyService.update(agency.id, {
      agency_photo: {
        file_name: imageAfterUpload.fileName,
        file_url: imageAfterUpload.publicUrl,
      },
    });

    await query.invalidateQueries({
      queryKey: ['agency'],
    });
  };

  const handleRemovePhoto = async () => {
    //TODO Should be refactored to a utils function
    const agencyPhotoPath = agency.agency_photo?.file_name;

    if (!agencyPhotoPath) return;

    const filename = agencyPhotoPath.split('/').pop();

    if (!filename) {
      console.error('Filename is undefined.');
      return;
    }

    const { error } = await supabase.storage
      .from('Reqeefy-storage')
      .remove([filename]);

    if (error) {
      renderErrorToast(
        "Une erreur est survenue lors de la suppression de l'image"
      );
    } else {
      toast.success('La photo a été supprimée avec succès');
      query.invalidateQueries({
        queryKey: ['agency'],
      });
      setPreviewUrl(null);
    }
  };

  return (
    <div className="flex items-center gap-12">
      <Avatar className="w-24 h-24 rounded-xl">
        <AvatarImage
          src={previewUrl ?? agency.agency_photo?.file_url}
          alt={`Photo de l'agence ${agency.name}`}
          className="h-full w-full rounded-lg object-cover border-2 border-primary-900"
        />
        <AvatarFallback className="w-full uppercase rounded-lg h-full text-2xl flex items-center justify-center">
          {agency.name[0]}
        </AvatarFallback>
      </Avatar>

      <div className="space-y-2">
        <h2 className="text-lg">Photo de profil</h2>
        <div className="flex gap-4 w-fit">
          <Label
            htmlFor="fileInput"
            className={buttonVariants({
              variant: 'default',
              size: 'sm',
              className: 'cursor-pointer',
            })}
          >
            {image || agency.agency_photo?.file_url
              ? 'Changer la'
              : 'Ajouter une'}{' '}
            photo
          </Label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
            size={1}
          />

          {previewUrl && <Button onClick={handleUpload}>Sauvegarder</Button>}
          {agency.agency_photo?.file_url && (
            <Button
              onClick={handleRemovePhoto}
              size={'sm'}
              variant={'destructive'}
            >
              Supprimer
            </Button>
          )}
        </div>
        <p className="text-xs text-gray-900">
          Nous supportons les formats JPG, PNG d&apos;une taille maximale de
          20Mo.
        </p>
      </div>
    </div>
  );
};
