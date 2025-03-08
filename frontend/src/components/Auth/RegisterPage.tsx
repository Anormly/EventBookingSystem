// src/components/Auth/RegisterPage.tsx
import React from 'react';
import RegisterForm from './RegisterForm';
import styles from './AuthPage.module.css';

const RegisterPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Регистрация</h1>
      <p>Пожалуйста, зарегистрируйтесь</p>
      <RegisterForm onSuccess={() => {}} />
    </div>
  );
};

export default RegisterPage;