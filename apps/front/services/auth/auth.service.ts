import { API_BASE_URL, API_PARAMS } from "@/constants/api";
import { LoginCredentials } from "@/types";

const login = async (credentials: LoginCredentials, token: string) => {
  const response = await fetch(
    `${API_BASE_URL}/auth/signin`,
    API_PARAMS.POST(credentials, token)
  );

  if (response.status === 404) {
    throw new Error("L'utilisateur n'existe pas");
  }

  return response.json();
};

const register = async (credentials: LoginCredentials, token: string) => {
  const response = await fetch(
    `${API_BASE_URL}/auth/signup`,
    API_PARAMS.POST(credentials, token)
  );

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  return response.json();
};

export const authService = {
  login,
  register,
};
