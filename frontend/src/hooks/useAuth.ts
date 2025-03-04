import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Проверяем, есть ли токен в localStorage при инициализации
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token'); // Удаляем токен из localStorage
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};

export default useAuth;