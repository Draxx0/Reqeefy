import { Button } from '@/components/client.index';
import { Alert, AlertDescription, AlertTitle } from '@/components/server.index';
import { FolderGit2, MessageCircle, User } from 'lucide-react';

export const NotificationsList = () => {
  return (
    <div className="grid gap-8 grid-cols-2">
      <Alert className="space-x-2 border-primary-700 relative">
        <div className="absolute -top-3 -right-3 bg-primary-900 text-white text-xs font-semibold px-2 py-1 rounded-full">
          Nouveau
        </div>

        <MessageCircle className="text-primary-700 w-6 h-6" />
        <div className="space-y-2">
          <AlertTitle className="font-semibold mb-3">
            Nouvelle discussion !{' '}
            <small className="text-gray-900">- Mardi 7 Mai 2024 à 21h22</small>
          </AlertTitle>
          <AlertDescription className="text-gray-900">
            Une nouvelles discussions a été créée par <strong>Max</strong> à
            propos de <strong>JOMO</strong>.
          </AlertDescription>
          <div className="flex justify-end">
            <Button>Consulter la discussion</Button>
          </div>
        </div>
      </Alert>

      <Alert className="space-x-2">
        <User className="text-primary-700 w-6 h-6" />
        <div className="space-y-2">
          <AlertTitle className="font-semibold mb-3">
            Max à répondu à votre message{' '}
            <small className="text-gray-900">- Mardi 7 Mai 2024 à 21h22</small>
          </AlertTitle>
          <AlertDescription className="text-gray-900">
            Max a répondu à votre message sur le ticket{' '}
            <strong>Passage de shopify à Hydrogen</strong>.
          </AlertDescription>
          <div className="flex justify-end">
            <Button>Répondre</Button>
          </div>
        </div>
      </Alert>

      <Alert className="space-x-2">
        <FolderGit2 className="text-primary-700 w-6 h-6" />
        <div className="space-y-2">
          <AlertTitle className="font-semibold mb-3">
            Vous êtes désormais référent du projet JOMO !{' '}
            <small className="text-gray-900">- Mardi 7 Mai 2024 à 21h22</small>
          </AlertTitle>
          <AlertDescription className="text-gray-900">
            Vous serais assigné par défaut à toutes les discussions relatives à
            ce projet.
          </AlertDescription>
          <div className="flex justify-end">
            <Button>Consulter le projet</Button>
          </div>
        </div>
      </Alert>
    </div>
  );
};
