/* файл AuthForm.tsx */

import React, {  useState } from 'react';
import styles from './AuthForm.module.css';
import { login } from '../../services/authService';
import useAuth from '../../hooks/useAuth'; 
import { LoginCredentials } from '../../types/authTypes';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import { useEffect } from 'react';

const AuthForm: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

// AuthForm.tsx
useEffect(() => {
  if (isAuthenticated) {
    console.log('Triggering redirect to /profile');
    navigate('/profile', { replace: true });
  }
}, [isAuthenticated, navigate]); // Добавьте navigate в зависимости

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const credentials: LoginCredentials = {
        emailOrUsername,
        password,
      };
      console.log('Before login request'); // <-- Новая строка
      const { token, user } = await login(credentials);
      console.log('After login response:', { token, user }); // <-- Новая строка
      authLogin(user, token); 
    
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      alert('Ошибка авторизации');
    } 
  };

  return (
    <div className={styles.container}>
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="emailOrUsername">Email или Имя пользователя</label>
          <input
            type="text"
            id="emailOrUsername"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Войти</button>
      </form>
    </div>
  );
};

export default AuthForm;