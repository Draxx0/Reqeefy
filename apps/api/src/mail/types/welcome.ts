export interface WelcomeMail {
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  token: string;
}
