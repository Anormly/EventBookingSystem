import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {

  const navigate = useNavigate();

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
          <li><button onClick={ ()=>{
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login')
          }}>выход</button></li>
        
          <li><Link to="/login">Вход</Link></li>
          <li><Link to="/register">Регистрация</Link></li>
  
        </ul>
      </nav>
    </header>
  );
};

export default Header;