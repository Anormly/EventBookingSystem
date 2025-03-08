/* файл authService.ts */

import { AuthResponse, LoginCredentials } from "../types/authTypes";

const API_URL = 'http://localhost:5000/api/auth'; 

export const login = async (
  credentials: LoginCredentials
) : Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( credentials ),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Ошибка авторизации');
    }

    const data = await response.json();
    console.log(data);
    return data; 

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Ошибка при выполнении запроса');
    } else {
      throw new Error('Неизвестная ошибка');
    }
  }
};