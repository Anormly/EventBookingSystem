import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEvents } from '../../services/eventServices';
import styles from './EventDetailPage.module.css';
import { EventType } from '../../types/eventTypes';
import { jwtDecode } from 'jwt-decode'
import { decode } from 'punycode';

interface JwtPayload {
  id: number;
  email: string;
  username: string;
}

const EditEventPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userId, setId] = useState(0)

  // Получаем текущего пользователя из localStorage
  const token : string | null = localStorage.getItem('token')
  const decoded_token = jwtDecode<JwtPayload>(token!)
  setId(decoded_token.id)

  const formatDateForInput = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      
      const timezoneOffset = date.getTimezoneOffset() * 60000;
      const adjustedDate = new Date(date.getTime() - timezoneOffset);
      
      return adjustedDate.toISOString().slice(0, 16);
    } catch {
      return '';
    }
  };

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);
        const events = await fetchEvents();
        const foundEvent = events.find(e => e.id === Number(id));
        console.log(foundEvent)
        console.log(foundEvent?.created_by)
        if (!foundEvent) {
          throw new Error('Событие не найдено');
        }
        
        // Проверяем, принадлежит ли событие текущему пользователю
        if (foundEvent.created_by !== userId) {
          throw new Error('У вас нет прав на редактирование этого события');
        }
        
        setEvent(foundEvent);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки события');
        setTimeout(() => navigate('/events'), 2000);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id, userId, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!event) return;
    
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: name === 'available_tickets' ? parseInt(value) || 0 : value
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) return;
    
    setEvent({
      ...event,
      date: e.target.value ? new Date(e.target.value).toISOString() : ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !userId) return;
    
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      

      const updates = {
        title: event.title,
        description: event.description,
        location: event.location,
        event_date: event.date,
        available_tickets: event.available_tickets
      };

      const response = await fetch(`http://localhost:5001/api/events/${event.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          created_by: userId,
          updates: updates
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка обновления события');
      }

      setSuccess('Событие успешно обновлено!');
      setTimeout(() => navigate('/events'), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при обновлении');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className={styles.container}>Загрузка...</div>;
  if (!event) return <div className={styles.container}>{error || 'Событие не найдено'}</div>;

  return (
    <div className={styles.container}>
      <h1>Редактирование события</h1>
      
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Название</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={event.title}
            onChange={handleChange}
            disabled={saving}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={event.description || ''}
            onChange={handleChange}
            className={styles.textarea}
            disabled={saving}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location">Место проведения</label>
          <input
            type="text"
            id="location"
            name="location"
            value={event.location || ''}
            onChange={handleChange}
            disabled={saving}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="event_date">Дата и время</label>
          <input
            type="datetime-local"
            id="event_date"
            name="event_date"
            required
            value={formatDateForInput(event.date)}
            onChange={handleDateChange}
            disabled={saving}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="available_tickets">Доступно билетов</label>
          <input
            type="number"
            id="available_tickets"
            name="available_tickets"
            min="0"
            required
            value={event.available_tickets}
            onChange={handleChange}
            disabled={saving}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button 
            type="submit" 
            className={styles.bookButton}
            disabled={saving}
          >
            {saving ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
          
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={() => navigate('/events')}
            disabled={saving}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEventPage;