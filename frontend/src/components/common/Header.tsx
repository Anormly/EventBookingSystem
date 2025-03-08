import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import useAuth from '../../hooks/useAuth';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Система бронирования билетов</h1>
      </div>
      <nav>
        <ul className={styles.navList}>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/events">Мероприятия</Link></li>
          <li><Link to="/booking">Бронирование</Link></li>
          
          {isAuthenticated ? (
            <>
              <li><Link to="/profile">Личный кабинет</Link></li>
              <li>
                <button 
                  onClick={logout}
                  className={styles.logoutButton}
                  aria-label="Выйти из системы"
                >
                  Выйти
                </button>
              </li>
            </>
          ) : (
            <>
            <li><Link to='/auth'>Auth</Link></li>
              <li><Link to="/login">Вход</Link></li>
              <li><Link to="/register">Регистрация</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;