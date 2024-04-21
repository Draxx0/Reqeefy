import { LoginForm } from '@/components/auth/LoginForm';
import { ButtonLink } from '@/components/client.index';
import { STATIC_PATHS } from '@/constants';

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

// <button
//   onClick={() => {
//     setUser({
//       agent: {} as Agent,
//       email: '',
//       first_name: '',
//       last_name: '',
//       id: '123',
//       avatar: null,
//       customer: {} as Customer,
//       is_email_confirmed: false,
//       preferences: {} as UserPreferences,
//     });
//   }}
// >
//   Login
// </button>
