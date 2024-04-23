import { API_BASE_URL, API_PARAMS } from '@/constants/api';
import { LoginCredentials } from '@/types';

const login = async (credentials: LoginCredentials, token: string) => {
  const response = await fetch(
    `${API_BASE_URL}/auth/signin`,
    API_PARAMS.POST(credentials, token)
  );

  if (response.status === 404) {
    throw new Error("L'utilisateur n'existe pas");
  } else if (response.status === 401) {
    throw new Error('Mot de passe incorrect');
  }

  return response.json();
};

const getToken = () => {
  const { state } = JSON.parse(localStorage.getItem('user-storage') || '{}');

  const { access_token } = state;

  if (!access_token) {
    throw new Error('Token introuvable');
  }

  return access_token;
};

export const authService = {
  login,
  getToken,
};
