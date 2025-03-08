import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // Импортируем стили

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Система бронирования билетов</h1>
      </div>
      <nav>
        <ul className={styles.navList}>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/auth">Авторизация</Link></li>
          <li><Link to="/events">Мероприятия</Link></li>
          <li><Link to="/booking">Бронирование</Link></li>
          <li><Link to="/profile">Личный кабинет</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
