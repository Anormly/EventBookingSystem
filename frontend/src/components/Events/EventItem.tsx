import React from 'react';
import { EventType } from '../../types/eventTypes';
import styles from './EventItem.module.css'; // Импортируем стили

interface EventItemProps {
  event: EventType;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  return (
    <div className={styles.eventCard}>
      <h3>{event.title}</h3>
      <p>Дата: {event.date}</p>
      <p>{event.description}</p>
      {event.available_tickets !== undefined && (
        <p>Доступно билетов: {event.available_tickets}</p>
      )}
    </div>
  );
};

export default EventItem;
