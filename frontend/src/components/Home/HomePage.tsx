import React, { useEffect } from 'react';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log(token)
  }, [])

  return (
    <div className={styles.container}>
      <h1>Добро пожаловать в систему бронирования билетов!</h1>
      <p>Здесь вы можете найти мероприятия и забронировать билеты.</p>
      <p>{ token }</p>
    </div>
  );
};

export default HomePage;