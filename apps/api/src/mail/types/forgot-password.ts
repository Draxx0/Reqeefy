export interface ForgotPasswordMail {
  user: {
    id: string;
    email: string;
  };
  token: string;
}
