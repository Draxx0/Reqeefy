import supabase from '@/lib/supabaseClient';
import { renderErrorToast } from '@/utils';

export const upload = async (file: File, folder: string) => {
  const { data, error } = await supabase.storage
    .from(folder)
    .upload(file.name, file);

  if (error) {
    renderErrorToast("Une erreur est survenue lors de l'envoi du fichier");
    return;
  }

  console.log('data', data);

  return data;
};
