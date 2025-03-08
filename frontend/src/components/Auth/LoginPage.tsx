// src/components/Auth/LoginPage.tsx
import React from 'react';
import AuthForm from './AuthForm';
import styles from './AuthPage.module.css';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Авторизация</h1>
      <p>Пожалуйста, войдите в систему</p>
      <AuthForm />
    </div>
  );
};

export default LoginPage;