/* файл authTypes.ts */

export interface User {
    id: number;
    email: string;
    username: string;
    password:string;
  }
  
  export interface AuthResponse {
    token: string;
    user: User; // Убедимся, что user включает все поля, включая id
  }

export interface LoginCredentials {
  emailOrUsername: string;
  password: string;
}

export interface RegisterCredentials{
  email: string;
  username: string;
  password_hash: string;
}