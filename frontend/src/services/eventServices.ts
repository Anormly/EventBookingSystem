import { EventType } from '../types/eventTypes';

export const fetchEvents = async (): Promise<EventType[]> => {
  const response = await fetch('http://localhost:5001/api/events');

  try {
    if(!response.ok){
      throw new Error("Ошибка при загрузке мероприятия")
    }  

    const events = await response.json();

    return events.map((event: any) => ({
      id: event.id,
      title: event.title,
      date: event.event_date,
      description: event.description,
      available_tickets: event.available_tickets,
      created_by: event.created_by
    }));


  } catch(error){
    alert("error! " + error);
    throw error;
  }
};
export const fetchEventById = async (id: number): Promise<EventType> => {
  const response = await fetch(`/api/events/${id}`);
  if (!response.ok) throw new Error('Событие не найдено');
  return response.json();
};