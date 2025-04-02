import { AppDataSource } from "../config/db";
import { Booking } from "../models/Booking";
import { Event } from "../models/Event";
import { User } from "../models/User"; 

const bookingRepository = AppDataSource.getRepository(Booking);
const eventRepository = AppDataSource.getRepository(Event);
const userRepository = AppDataSource.getRepository(User); 

export const bookTicket = async (event_id: number, user_id: number) => {
    const event = await eventRepository.findOneBy({ id: event_id });
    if (!event) throw new Error("Событие не найдено");

    if (event.available_tickets <= 0) {
        throw new Error("Нет доступных билетов");
    }

    const user = await userRepository.findOneBy({ id: user_id });
    if (!user) throw new Error("Пользователь не найден");

    const existingBooking = await bookingRepository.findOne({
        where: {
            event: { id: event_id },
            user: { id: user_id }
        },
    });

    if (existingBooking) {
        throw new Error("Вы уже забронировали билет на это событие");
    }

    event.available_tickets -= 1;
    await eventRepository.save(event);

    const booking = bookingRepository.create({
        event: { id: event_id },
        user: { id: user_id },
        status: "confirmed"
    });

    return await bookingRepository.save(booking);
};

// Получение всех бронирований пользователя
export const getUserBookings = async (userId: number) => {
    return await bookingRepository.find({
        where: { user: { id: userId } },
        relations: ['event', 'user']
    });
};

// Отмена бронирования
export const cancelBooking = async (bookingId: number, userId: number) => {
    const booking = await bookingRepository.findOne({
        where: { id: bookingId, user: { id: userId } },
        relations: ['event']
    });

    if (!booking) {
        throw new Error("Бронирование не найдено или нет прав на отмену");
    }

    if (booking.status === 'cancelled') {
        throw new Error("Бронирование уже отменено");
    }

    booking.event.available_tickets += 1;
    await eventRepository.save(booking.event);

    booking.status = 'cancelled';
    return await bookingRepository.save(booking);
};