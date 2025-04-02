import { BookingType } from '../types/bookingTypes';

export const bookTicket = async (eventId: number, ticketCount: number): Promise<BookingType> => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Требуется авторизация');
  }

  const response = await fetch(`http://localhost:5001/api/bookings/${eventId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Ошибка бронирования');
  }

  return await response.json();
};