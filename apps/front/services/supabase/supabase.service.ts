import supabase from '@/lib/supabaseClient';import { renderErrorToast } from '@/utils';

export const uploadImage = async (
  file: File,
  folderPath: string
): Promise<{ publicUrl: string; fileName: string } | void> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${file.name.split('.').shift()}.${fileExt}`;
  const filePath = `${folderPath}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('Reqeefy-storage')
    .upload(filePath, file, {
      upsert: true,
    });

  if (error) {
    renderErrorToast("Une erreur est survenue lors de l'envoi du fichier");
    return;
  }

  const { data: image } = supabase.storage
    .from('Reqeefy-storage')
    .getPublicUrl(filePath);

  return {
    publicUrl: image.publicUrl,
    fileName,
  };
};
