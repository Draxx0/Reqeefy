export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const GET = (token: string) => {
  return {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const POST = <T>(data: T, token: string) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
};

const PUT = <T>(data: T, token: string) => {
  return {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
};

export const API_PARAMS = {
  GET,
  POST,
  PUT,
};
