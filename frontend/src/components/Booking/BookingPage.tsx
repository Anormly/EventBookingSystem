import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './BookingPage.module.css';
import { jwtDecode } from "jwt-decode"

interface JwtPayload {
  id: number;
  email: string;
  username: string;
}

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

const BookingPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token : string | any = localStorage.getItem('token');
        
        const decoded_jwt = jwtDecode<JwtPayload>(token);
        const user_id = decoded_jwt.id; 
        
        if (!user_id) {
          throw new Error('Пользователь не авторизован');
        }
    
        const response = await fetch(`http://localhost:5001/api/bookings?user_id=${user_id}`, {
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
  }, []);

  const handleCancel = async (bookingId: number) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:5001/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Ошибка отмены бронирования');
      }

      setBookings(bookings.filter(b => b.id !== bookingId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при отмене');
    }
  };

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

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>Мои бронирования</h1>
      
      {bookings.length === 0 ? (
        <p>У вас нет активных бронирований</p>
      ) : (
        <div className={styles.bookingList}>
          {bookings.map(booking => (
            <div key={booking.id} className={styles.bookingCard}>
              <div className={styles.eventInfo}>
                <h2>
                  <Link to={`/events/${booking.event.id}`}>{booking.event.title}</Link>
                </h2>
                <p>Дата: {formatDate(booking.event.event_date)}</p>
                <p>Место: {booking.event.location || 'Не указано'}</p>
                <p>Статус: <span className={styles[booking.status]}>{booking.status}</span></p>
                <p>Дата бронирования: {formatDate(booking.createdAt)}</p>
              </div>
              
              {booking.status === 'confirmed' && (
                <button 
                  onClick={() => handleCancel(booking.id)}
                  className={styles.cancelButton}
                >
                  Отменить
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingPage;