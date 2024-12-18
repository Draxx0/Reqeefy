import { ButtonLink, ResetPasswordForm } from '@/components/client.index';
import { Separator } from '@/components/server.index';
import { STATIC_PATHS } from '@/constants';

export default function ResetPassword() {
  return (
    <div className="space-y-12">
      <ButtonLink href={STATIC_PATHS.LOGIN} className="flex w-fit m-auto mr-0">
        Me connecter
      </ButtonLink>

      <div className="space-y-8 max-w-2xl mx-auto">
        <div className="space-y-4">
          <h1 className="text-3xl font-medium text-center">
            Réinitialisation de mot de passe
          </h1>
          <p className="text-sm text-center text-gray-900">
            Entrez votre adresse e-mail pour réinitialiser votre mot de passe.
          </p>
        </div>
        <Separator className="bg-primary-500" />
        <ResetPasswordForm />
      </div>
    </div>
  );
}
