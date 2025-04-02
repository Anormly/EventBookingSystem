import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEvents } from '../../services/eventServices';
import { bookTicket } from '../../services/bookingService';
import styles from './EventDetailPage.module.css';
import { EventType } from '../../types/eventTypes';
import { formatEventDate } from '../../utils/dateUtils';

const EventPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [ticketCount, setTicketCount] = useState(1);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);
        const events = await fetchEvents();
        const foundEvent = events.find(e => e.id === Number(id));
        
        if (!foundEvent) {
          navigate('/not-found', { replace: true });
          return;
        }
        
        console.log('Loaded event data:', foundEvent); // Добавим логирование
        setEvent(foundEvent);
      } catch (err) {
        console.error('Error loading event:', err);
        setError('Ошибка загрузки события');
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id, navigate]);

  const handleBooking = async () => {
    if (!event || ticketCount <= 0) return;
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await bookTicket(event.id, ticketCount);
      setSuccess('Билет(ы) успешно забронированы!');
      // Обновляем данные события после бронирования
      const updatedEvents = await fetchEvents();
      const updatedEvent = updatedEvents.find(e => e.id === event.id);
      setEvent(updatedEvent || event);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка бронирования');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (!event) return <div>Событие не найдено</div>;

  return (
    <div className={styles.container}>
      <h1>{event.title}</h1>
      <p>Дата: {event.date ? formatEventDate(event.date) : 'Дата не указана'}</p>
      <p>Место: {event.location || 'Не указано'}</p>
      <p>Доступно билетов: {event.available_tickets}</p>
      <p>{event.description}</p>

      <div className={styles.bookingSection}>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        
        <div className={styles.ticketCount}>
          <label htmlFor="ticketCount">Количество билетов:</label>
          <input 
            type="number" 
            id="ticketCount" 
            value={ticketCount} 
            onChange={(e) => setTicketCount(Math.max(1, Math.min(event.available_tickets, Number(e.target.value))))}
            min="1" 
            max={event.available_tickets} 
            disabled={loading}
          />
        </div>

        <button 
          onClick={handleBooking}
          disabled={loading || event.available_tickets <= 0}
          className={styles.bookButton}
        >
          {loading ? 'Обработка...' : 'Забронировать билет'}
        </button>
      </div>
    </div>
  );
};

export default EventPage;