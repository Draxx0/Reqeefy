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

  // Normalisation du nom du fichier pour supprimer les accents et les caractères spéciaux
  const sanitizedFileName = file?.name
    ?.split('.')
    .shift()
    ?.normalize('NFD') // Normalisation des accents
    ?.replace(/[\u0300-\u036f]/g, '') // Suppression des accents
    ?.replace(/\s+/g, '_') // Remplacement des espaces par des underscores
    ?.replace(/[^a-zA-Z0-9-_]/g, ''); // Suppression des caractères spéciaux

  const fileName = `${sanitizedFileName}.${fileExt}`;
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

  const { data: imageData } = supabase.storage
    .from('Reqeefy-storage')
    .getPublicUrl(filePath);

  if (!imageData?.publicUrl) {
    renderErrorToast(
      "Une erreur est survenue lors de la récupération de l'URL du fichier"
    );
    return;
  }

  return {
    publicUrl: imageData.publicUrl,
    fileName,
  };
};

export const uploadFiles = async (
  files: File[],
  folderPath: string
): Promise<UploadResult[]> => {
  const results: UploadResult[] = [];

  for (const file of files) {
    const fileExt = file.name.split('.').pop();

    // Normalisation du nom du fichier pour supprimer les accents et les caractères spéciaux
    const sanitizedFileName = file?.name
      ?.split('.')
      .shift()
      ?.normalize('NFD') // Normalisation des accents
      ?.replace(/[\u0300-\u036f]/g, '') // Suppression des accents
      ?.replace(/\s+/g, '_') // Remplacement des espaces par des underscores
      ?.replace(/[^a-zA-Z0-9-_]/g, ''); // Suppression des caractères spéciaux

    const fileName = `${sanitizedFileName}.${fileExt}`;
    const filePath = `${folderPath}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('Reqeefy-storage')
      .upload(filePath, file, {
        upsert: true,
      });

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
