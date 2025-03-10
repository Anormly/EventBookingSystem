import React, { useState } from 'react';
import styles from './AuthForm.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthResponse, LoginCredentials } from '../../types/authTypes';

interface AuthFormProps {
  onSuccess: () => void;
}

const loginUser = async (
  credentials: LoginCredentials
) : Promise<AuthResponse> => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify( credentials ),
  });

  if (!response.ok) {
    console.log(credentials)
    const errorData = await response.json();
    throw new Error(errorData.error || 'Ошибка регистрации');;
  } 
  
  const data = await response.json();

  return data;
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
    setError('')

    try {
      const data = await loginUser({ emailOrUsername, password });
      console.log('авторизация успешна')
      onSuccess();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user))
      console.log(data)
      navigate('/profile');
    } 
    catch (err: unknown) {
      setError('Ошибка авторизации, попробуйте ещё раз');
    }
    finally {
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