import { ButtonLink } from '@/components/client.index';import { STATIC_PATHS } from '@/constants';

export default function AuthRegisterPage() {
  return (
    <div className="space-y-12">
      <ButtonLink href={STATIC_PATHS.LOGIN} className="flex w-fit m-auto mr-0">
        Se connecter
      </ButtonLink>
    </div>
  );
}
