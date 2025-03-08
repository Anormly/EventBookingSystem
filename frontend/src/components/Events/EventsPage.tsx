import React from 'react';
import EventsList from './EventsList'; // Импортируем список мероприятий
import styles from './EventsPage.module.css';

const EventsPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Мероприятия</h1>
      <p>Здесь вы можете найти все доступные мероприятия.</p>
      <EventsList /> {/* Добавляем список мероприятий */}
    </div>
  );
};

export default EventsPage;
