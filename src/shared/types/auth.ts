import type { User } from './user';

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterCredentials extends Required<Pick<LoginCredentials, 'email' | 'password'>> {
  name: string;
  lastName: string;
}