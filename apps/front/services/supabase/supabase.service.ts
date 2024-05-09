import supabase from '@/lib/supabaseClient';
import { renderErrorToast } from '@/utils';
import { toast } from 'sonner';

interface UploadResult {
  publicUrl: string;
  fileName: string;
}

export const uploadImage = async (
  file: File,
  folderPath: string
): Promise<UploadResult | void> => {
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

export const uploadFiles = async (
  files: File[],
  folderPath: string
): Promise<UploadResult[]> => {
  const results: UploadResult[] = [];

  for (const file of files) {
    console.log('Uploading file', file.name);
    const fileExt = file.name.split('.').pop();
    const fileName = `${file.name.split('.')[0]}.${fileExt}`;
    const filePath = `${folderPath}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('Reqeefy-storage')
      .upload(filePath, file, {
        upsert: true,
      });

    console.log('files has been uploaded', data?.path);

    if (error) {
      renderErrorToast(
        "Une erreur est survenue lors de l'envoi du fichier: " + error.message
      );
      continue;
    }

    // Get a signed URL for the uploaded file
    const { data: uploadedFile } = supabase.storage
      .from('Reqeefy-storage')
      .getPublicUrl(filePath);
    // .createSignedUrl(filePath, 60 * 60 * 24);

    // if (signError) {
    //   renderErrorToast(
    //     "Une erreur est survenue lors de la création de l'URL signée: " +
    //       signError.message
    //   );
    //   continue;
    // }

    if (uploadedFile) {
      results.push({
        publicUrl: uploadedFile.publicUrl,
        fileName: fileName,
      });
    }
  }

  toast.success('Fichiers téléchargés avec succès');

  return results;
};
