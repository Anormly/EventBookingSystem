import React from 'react';
import { EventType } from '../../types/eventTypes';
import styles from './EventItem.module.css'; // Импортируем стили

interface EventItemProps {
  event: EventType;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{event.title}</h2>
      <p className={styles.date}>{event.date}</p>
      <p className={styles.description}>{event.description}</p>
      <button className={styles.bookButton}>Забронировать</button>
    </div>
  );
};

export default EventItem;
