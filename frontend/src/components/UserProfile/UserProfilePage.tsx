/* файл UserProfilePage.tsx */

import React, { useState, useEffect } from 'react';
import styles from './UserProfilePage.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface Booking {
  id: number;
  status: string;
  createdAt: string;
  event: {
    id: number;
    title: string;
    description: string;
    event_date: string;
    location: string;
    available_tickets: number;
  };
}

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if(!localStorage.getItem('token')){
      console.log("NOT AUTHENTICATED")
      navigate('/login')
    }
    
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
    
    const fetchBookings = async () => {
      try {
        if (!userData.id) {
          throw new Error('Пользователь не авторизован');
        }
    
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5001/api/bookings?user_id=${userData.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (!response.ok) {
          throw new Error('Ошибка загрузки бронирований');
        }
    
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка при загрузке');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.container}>
      <h1>Личный кабинет { user.username || "Не указано" }</h1>
      
      <section className={styles.bookingHistory}>
        <h2>История бронирований</h2>
        {loading ? (
          <div>Загрузка...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : bookings.length === 0 ? (
          <p>У вас нет активных бронирований</p>
        ) : (
          <ul className={styles.bookingList}>
            {bookings.map(booking => (
              <li key={booking.id} className={styles.bookingItem}>
                <h3>
                  <Link to={`/events/${booking.event.id}`}>{booking.event.title}</Link>
                </h3>
                <p><strong>Дата мероприятия:</strong> {formatDate(booking.event.event_date)}</p>
                <p><strong>Место:</strong> {booking.event.location || 'Не указано'}</p>
                <p><strong>Статус:</strong> {booking.status}</p>
                <p><strong>Дата бронирования:</strong> {formatDate(booking.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      
      <section className={styles.profileInfo}>
        <div className={styles.infoItem}>
          <span>Email:</span>
          <span>{ user.email }</span>
        </div>
        <div className={styles.infoItem}>
          <span>Имя пользователя:</span>
          <span>{ user.username }</span>
        </div>
      </section>
      
      <section className={styles.profileSettings}>
        <h2>Настройки профиля</h2>
        <form className={styles.settingsForm}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Имя пользователя:</label>
            <input type="text" id="username" defaultValue={user.username}/>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Электронная почта</label>
            <input type="email" id="email" defaultValue={ user.email }/>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль</label>
            <input type="password" id="password" placeholder="Введите новый пароль" />
          </div>
          <button type="submit" className={styles.button}>Сохранить изменения</button>
        </form>
      </section>

      <button 
        // onClick={ logout }
        className={styles.logoutButton}
      >
        Выйти из системы
      </button>
    </div>
  );
};

export default UserProfilePage;