import React from 'react';
import { EventType } from '../../types/eventTypes';
import styles from './EventDetailPage.module.css';

interface EventDetailPageProps {
  event: EventType; // Получаем событие как пропс
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ event }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{event.title}</h1>
      <p className={styles.date}>{event.date}</p>
      <p className={styles.description}>{event.description}</p>
      <button className={styles.bookButton}>Забронировать</button>
    </div>
  );
};

export default EventDetailPage;
