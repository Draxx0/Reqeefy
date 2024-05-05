import { ButtonLink, LoginForm } from '@/components/client.index';
import { STATIC_PATHS } from '@/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reqeefy | Connexion',
  description: 'Connectez-vous à votre compte.',
}

export default function AuthLoginPage() {
  return (
    <div className="space-y-12">
      <ButtonLink
        href={STATIC_PATHS.REGISTER}
        className="flex w-fit m-auto mr-0"
      >
        Créer mon agence
      </ButtonLink>

      <div className="space-y-12 max-w-2xl mx-auto">
        <h1 className="text-3xl text-center">Me connecter</h1>
        <LoginForm />
      </div>
    </div>
  );
}
