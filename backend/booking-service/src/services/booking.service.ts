import { AppDataSource } from "../config/db";
import { Booking } from "../models/Booking";
import { Event } from "../models/Event";
import { User } from "../models/User"; 

const bookingRepository = AppDataSource.getRepository(Booking);
const eventRepository = AppDataSource.getRepository(Event);
const userRepository = AppDataSource.getRepository(User); 

export const bookTicket = async (eventId: number, userId: number) => {
    const event = await eventRepository.findOneBy({ id: eventId });
    if (!event) throw new Error("Событие не найдено");

    if (event.available_tickets <= 0) {
        throw new Error("Нет доступных билетов");
    }

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) throw new Error("Пользователь не найден");

    // Проверяем, есть ли уже бронь на этот ивент
    const existingBooking = await bookingRepository.findOne({
        where: { event: { id: eventId }, user: { id: userId } },
    });

    if (existingBooking) {
        throw new Error("Вы уже забронировали билет на это событие");
    }

    event.available_tickets -= 1;
    await eventRepository.save(event);


    const booking = bookingRepository.create({
        event: { id: eventId }, 
        user: { id: userId },   
        status: "confirmed"
    });

    return await bookingRepository.save(booking);
};