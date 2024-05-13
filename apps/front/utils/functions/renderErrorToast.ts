import { toast } from 'sonner';

export const renderErrorToast = (error: string) => {
  toast.error('Une erreur est survenue', {
    duration: 10000,
    description: error,
    classNames: {
      error: 'bg-red-500',
    },
  });
};
