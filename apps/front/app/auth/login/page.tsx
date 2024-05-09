import { ButtonLink, LoginForm } from '@/components/client.index';
import { Separator } from '@/components/server.index';
import { STATIC_PATHS } from '@/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reqeefy | Connexion',
  description: 'Connectez-vous à votre compte.',
};

export default function AuthLoginPage() {
  return (
    <div className="space-y-12">
      <ButtonLink
        href={STATIC_PATHS.REGISTER}
        className="flex w-fit m-auto mr-0"
      >
        Créer mon agence
      </ButtonLink>

      <div className="space-y-8 max-w-2xl mx-auto">
        <div className="space-y-4">
          <h1 className="text-3xl font-medium text-center">
            Accès à mon espace
          </h1>
          <p className="text-sm text-center text-gray-900">
            Entrez dans votre espace personnel et profitez d&apos;une expérience
            sur mesure, conçue juste pour vous.
          </p>
        </div>
        <Separator className="bg-primary-500" />
        <LoginForm />
      </div>
    </div>
  );
}
