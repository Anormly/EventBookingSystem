// src/types/authTypes.ts

export interface User {
  id: number;
  email: string;
  username: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  emailOrUsername: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  username: string;
  password: string; // Изменили с password_hash на password
}

export default User;