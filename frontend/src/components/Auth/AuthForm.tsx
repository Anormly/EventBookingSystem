// src/components/AuthForm.tsx
import React, { useState } from 'react';
import styles from './AuthForm.module.css';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { LoginCredentials } from '../../types/authTypes';

interface AuthFormProps {
  onSuccess: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const credentials: LoginCredentials = {
        emailOrUsername,
        password
      };
      
      await authService.login(credentials);
      onSuccess();
      navigate('/profile');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Ошибка авторизации, попробуйте ещё раз');
      } else {
        setError('Ошибка авторизации, попробуйте ещё раз');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Авторизация</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="emailOrUsername">Email или Имя пользователя</label>
          <input
            type="text"
            id="emailOrUsername"
            required
            value={ emailOrUsername }
            onChange={(e) => setEmailOrUsername(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            required
            value={ password }
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.button} disabled={loading}>
          { loading ? 'Загрузка...'  : 'Войти'}
        </button>

      </form>
    </div>
  );
};

export default AuthForm;


