// src/services/authService.ts
import { 
    AuthResponse, 
    LoginCredentials, 
    RegisterCredentials,
    User 
  } from '../types/authTypes';
  
  const API_BASE_URL = 'http://localhost:5000/api/auth';
  
  const storeAuthData = (data: AuthResponse): void => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  };
  
  export const clearAuthData = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };
  
  export const getCurrentUser = (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  export const getToken = (): string | null => {
    return localStorage.getItem('token');
  };
  
  export const register = async (credentials: RegisterCredentials): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        username: credentials.username,
        password: credentials.password // Отправляем password, а не password_hash
      }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }
  };
  
  export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }
  
    const data: AuthResponse = await response.json();
    storeAuthData(data);
    return data;
  };
  
  export const logout = (): void => {
    clearAuthData();
  };
  
  export const isAuthenticated = (): boolean => {
    return !!getToken();
  };
  
  const authService = {
    register,
    login,
    logout,
    getCurrentUser,
    getToken,
    isAuthenticated,
  };
  
  export default authService;