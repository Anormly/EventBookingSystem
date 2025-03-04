const API_URL = 'http://localhost:5000/api/login'; 

export const login = async (emailOrUsername: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emailOrUsername, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Ошибка авторизации');
    }

    const data = await response.json();
    return data; // Возвращаем данные, полученные от сервера

    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Ошибка при выполнении запроса');
    } else {
      throw new Error('Неизвестная ошибка');
    }
  }
};