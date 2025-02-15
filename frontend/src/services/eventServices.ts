import { EventType } from '../types/eventTypes';

export const fetchEvents = async (): Promise<EventType[]> => {
  // Здесь будет логика для получения списка мероприятий
  return [
    { id: 1, title: 'Концерт', date: '2023-12-01', description: 'Концерт известной группы' },
    { id: 2, title: 'Театральная постановка', date: '2023-12-05', description: 'Постановка классической пьесы' },
  ]; // Заглушка
};
