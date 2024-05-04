import { cookies } from 'next/headers';
export const isAuthenticated = async () => {
  const user = cookies().get('USER_DATA');

  if (!user) return null;

  const parsedUser = JSON.parse(user?.value);

  if (!parsedUser) return null;

  if (!parsedUser.id || !parsedUser.email) return null;

  return true;
};
