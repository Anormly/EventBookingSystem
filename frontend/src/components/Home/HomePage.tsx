import React from 'react';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Добро пожаловать в систему бронирования билетов!</h1>
      <p>Здесь вы можете найти мероприятия и забронировать билеты.</p>
    </div>
  );
};

export default HomePage;