export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  agencyName: string;
  activity_area: string;
  website_url?: string;
  agency_jobs: string[];
  description?: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
