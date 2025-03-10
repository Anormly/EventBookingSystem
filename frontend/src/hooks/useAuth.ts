/* файл useAuth.ts */

import { useState, useEffect } from 'react';
import { User } from '../types/authTypes';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    console.log("Use Auth Use Effect Token:", token)
    console.log("Use Auth Use Effect User:", storedUser)

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser); // Парсим строку в объект
        setIsAuthenticated(true);
        setUser(parsedUser);
      } catch (error) {
        console.error('Ошибка при парсинге пользователя:', error);
        localStorage.removeItem('user'); // Удаляем невалидные данные
      }
    }
    else{
      setIsAuthenticated(false); // Явно указываем, что пользователь не авторизован
      setUser(null);
    }
  }, []);

  const login = (userData: User, token: string) => {
    console.log('Login called with:', { userData, token }); 

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData); 
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return { isAuthenticated, user, login, logout };
};

export default useAuth;