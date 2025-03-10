import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../../services/eventServices';
import EventItem from './EventItem';
import styles from './EventsList.module.css';
import { EventType } from '../../types/eventTypes';

const EventsList: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const eventsData = await fetchEvents();
      setEvents(eventsData);
    };

    loadEvents();
  }, []);


  // Заглушки для мероприятий
  const placeholderEvents: EventType[] = [
    {
      id: 1,
      title: 'Концерт классической музыки',
      date: '15 марта 2023',
      description: 'Присоединяйтесь к нам на вечер классической музыки с известными исполнителями.',
    },
    {
      id: 2,
      title: 'Выставка современного искусства',
      date: '20 апреля 2023',
      description: 'Не пропустите уникальную выставку современных художников.',
    },
    {
      id: 3,
      title: 'Техническая конференция',
      date: '5 мая 2023',
      description: 'Обсуждение последних тенденций в области технологий и инноваций.',
    },
  ];

  return (
    <div className={styles.container}>
      <h1>Список мероприятий</h1>
      {(events.length > 0 ? events : placeholderEvents).map(event => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
