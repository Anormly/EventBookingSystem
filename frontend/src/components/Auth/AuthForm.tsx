import React, { useState } from 'react';
import styles from './AuthForm.module.css';
import { login } from '../../services/authService';
import useAuth from '../../hooks/useAuth'; 

const AuthForm: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login: setAuth } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token, user } = await login(emailOrUsername, password); // Вызываем функцию login
      localStorage.setItem('token', token); // Сохраняем токен в localStorage
      setAuth(); // Устанавливаем аутентификацию
      console.log('Авторизация успешна:', user);

      // Здесь можно перенаправить пользователя на другую страницу
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      if (error instanceof Error) {
        alert("Незивестная ошибка")
        //throw new Error(error.message || 'Ошибка при выполнении запроса');
      } else {
        alert(new Error("Неизваестная ошибка"));
        //throw new Error('Неизвестная ошибка');
      }
       // Показываем сообщение об ошибке
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