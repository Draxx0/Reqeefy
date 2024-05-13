'use client';
import { Button, buttonVariants } from '@/components/client.index';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Label,
} from '@/components/server.index';
import supabase from '@/lib/supabaseClient';
import { agencyService, uploadImage, userService } from '@/services';
import { useAuthStore } from '@/stores';
import { renderErrorToast } from '@/utils';
import { Agency } from '@reqeefy/types';
import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';

export const UserUploadAvatar = () => {
  const { user, setUser } = useAuthStore();
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const query = useQueryClient();

  if (!user) return null;

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

    const imageAfterUpload = await uploadImage(image, 'user-avatars');

    if (!imageAfterUpload) {
      renderErrorToast("Une erreur est survenue lors de l'envoi du fichier");
      return;
    }

    setPreviewUrl(null);
    setImage(null);

    toast.success('La photo a été téléchargée avec succès');

    const updatedUser = await userService.updateUserProfile({
      userId: user.id,
      data: {
        avatar: {
          file_name: imageAfterUpload.fileName,
          file_url: imageAfterUpload.publicUrl,
        },
      },
    });

    setUser(updatedUser);

    await query.invalidateQueries({
      queryKey: ['agency'],
    });
  };

  const handleRemovePhoto = async () => {
    //TODO Should be refactored to a utils function
    const userPhotoPath = user?.avatar?.file_name;

    if (!userPhotoPath) return;

    const filename = userPhotoPath.split('/').pop();

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
      // query.invalidateQueries({
      //   queryKey: ['agency'],
      // });
      setPreviewUrl(null);
    }
  };

  return (
    <div className="flex items-center gap-12">
      <Avatar className="w-24 h-24 rounded-xl">
        <AvatarImage
          src={previewUrl ?? user.avatar?.file_url}
          alt={`Photo de l'utilisateur ${user.first_name} ${user.last_name}`}
          className="h-full w-full rounded-lg object-cover border-2 border-primary-900"
        />
        <AvatarFallback className="w-full uppercase rounded-lg h-full text-2xl flex items-center justify-center">
          {user.first_name[0]}
          {user.last_name[0]}
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
            {image || user.avatar?.file_url ? 'Changer la' : 'Ajouter une'}{' '}
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
          {user.avatar?.file_url && (
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
