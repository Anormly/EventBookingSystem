import { useState, useEffect, useRef } from 'react';
import { User } from '../types/authTypes';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const initialized = useRef(false); // Флаг для предотвращения двойного вызова

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true; 

    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
<<<<<<< HEAD
    
    console.log("Use Auth Use Effect Token:", token)
    console.log("Use Auth Use Effect User:", storedUser)
=======
>>>>>>> 77abfb6876baabb7e082a908a4c5472f0c784fc8

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

    console.log('Initial auth state:', { isAuthenticated: true, user: JSON.parse(storedUser || 'null') });
  }, []);

  useEffect(() => {
    console.log('Auth state changed:', { isAuthenticated, user });
  }, [isAuthenticated, user]);

  const login = (userData: User, token: string) => {
<<<<<<< HEAD
    console.log('Login called with:', { userData, token }); 
=======
    console.log('Login called with:', { userData, token });
>>>>>>> 77abfb6876baabb7e082a908a4c5472f0c784fc8

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));

    setUser(userData);
    setIsAuthenticated(true);
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
