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

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }

    console.log('Initial auth state:', { isAuthenticated: true, user: JSON.parse(storedUser || 'null') });
  }, []);

  useEffect(() => {
    console.log('Auth state changed:', { isAuthenticated, user });
  }, [isAuthenticated, user]);

  const login = (userData: User, token: string) => {
    console.log('Login called with:', { userData, token });

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
