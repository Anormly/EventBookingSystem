import React, { useState } from 'react';
import AuthForm from './AuthForm'; 
import RegisterForm from './RegisterForm'; 
import styles from './AuthPage.module.css';

const AuthPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className={styles.container}>
      <h1>{isRegistering ? 'Регистрация' : 'Авторизация'}</h1>
      <p>Пожалуйста, {isRegistering ? 'зарегистрируйтесь' : 'войдите'}.</p>
      {isRegistering ? <RegisterForm /> : <AuthForm />}
      <button onClick={toggleForm} className={styles.toggleButton}>
        {isRegistering ? 'Авторизация' : 'Регистрация'}
      </button>
    </div>
  );
};

export default AuthPage;
