import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EventDetailPage.module.css';

const EventCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    event_date: getDefaultDateTime(), // Устанавливаем дату по умолчанию
    available_tickets: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Функция для получения текущей даты + 1 день в правильном формате
  function getDefaultDateTime() {
    const now = new Date();
    now.setDate(now.getDate() + 1); // Завтрашняя дата
    return now.toISOString().slice(0, 16);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'available_tickets' ? parseInt(value) || 0 : value
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      event_date: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация даты
    if (!formData.event_date || isNaN(new Date(formData.event_date).getTime())) {
      setError('Укажите корректную дату и время');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      const response = await fetch('http://localhost:5001/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          created_by: user.id,
          title: formData.title,
          description: formData.description,
          event_date: new Date(formData.event_date).toISOString(),
          location: formData.location,
          available_tickets: formData.available_tickets
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка создания события');
      }

      setSuccess('Событие успешно создано!');
      setTimeout(() => navigate('/events'), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при создании события');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Создание нового события</h1>
      
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Название *</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className={styles.textarea}
            disabled={loading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location">Место проведения</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="event_date">Дата и время *</label>
          <input
            type="datetime-local"
            id="event_date"
            name="event_date"
            required
            value={formData.event_date}
            onChange={handleDateChange}
            disabled={loading}
            min={new Date().toISOString().slice(0, 16)} // Запрещаем выбирать прошедшие даты
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="available_tickets">Доступно билетов *</label>
          <input
            type="number"
            id="available_tickets"
            name="available_tickets"
            min="1"
            required
            value={formData.available_tickets}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button 
            type="submit" 
            className={styles.bookButton}
            disabled={loading}
          >
            {loading ? 'Создание...' : 'Создать событие'}
          </button>
          
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={() => navigate('/events')}
            disabled={loading}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventCreate;