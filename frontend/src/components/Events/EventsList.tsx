import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../../services/eventServices';
import styles from './EventsList.module.css';

const EventsList: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/events');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        console.log('Received events data:', data); // Добавьте логирование
        setEvents(data);
      } catch (err) {
        console.error('Error loading events:', err);
        setError('Не удалось загрузить мероприятия');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Неверная дата';
      
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (err) {
      console.error('Error formatting date:', err);
      return 'Неверный формат даты';
    }
  };

  if (loading) return <div>Загрузка мероприятий...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>Список мероприятий</h1>
      {events.length === 0 ? (
        <div>Мероприятий пока нет...</div>
      ) : (
        events.map(event => (
          <div key={event.id} className={styles.eventCard}>
            <Link to={`/events/${event.id}`} className={styles.eventLink}>
              <h2>{event.title}</h2>
            </Link>
            <p>Дата: {formatDate(event.event_date)}</p>
            <p>{event.description || 'Описание отсутствует'}</p>
            <p>Доступно билетов: {event.available_tickets}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default EventsList;