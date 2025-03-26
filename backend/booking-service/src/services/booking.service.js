"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookTicket = void 0;
const db_1 = require("../config/db");
const Booking_1 = require("../models/Booking");
const Event_1 = require("../models/Event");
const User_1 = require("../models/User");
const bookingRepository = db_1.AppDataSource.getRepository(Booking_1.Booking);
const eventRepository = db_1.AppDataSource.getRepository(Event_1.Event);
const userRepository = db_1.AppDataSource.getRepository(User_1.User);
const bookTicket = async (eventId, userId) => {
    const event = await eventRepository.findOneBy({ id: eventId });
    if (!event)
        throw new Error("Событие не найдено");
    if (event.available_tickets <= 0)
        throw new Error("Нет доступных билетов");
    const user = await userRepository.findOneBy({ id: userId });
    if (!user)
        throw new Error("Пользователь не найден");
    const booking = bookingRepository.create({
        event: event,
        user: user,
        status: "confirmed"
    });
    event.available_tickets -= 1;
    await eventRepository.save(event);
    return await bookingRepository.save(booking);
};
exports.bookTicket = bookTicket;
