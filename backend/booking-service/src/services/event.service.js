"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpiredEvents = exports.updateEvent = exports.createEvent = exports.getActiveEvents = void 0;
const db_1 = require("../config/db");
const Event_1 = require("../models/Event");
const typeorm_1 = require("typeorm");
const eventRepository = db_1.AppDataSource.getRepository(Event_1.Event);
const getActiveEvents = async (_req, res) => {
    try {
        const events = await eventRepository.find({
            where: { event_date: (0, typeorm_1.MoreThan)(new Date()) },
        });
        return res.json(events);
    }
    catch (error) {
        console.error("Ошибка при получении событий:", error);
        return res.status(500).json({ error: "Ошибка при получении событий" });
    }
};
exports.getActiveEvents = getActiveEvents;
const createEvent = async (userId, title, description, event_date, location, available_tickets) => {
    try {
        if (!title || !event_date || !available_tickets) {
            throw new Error("Некорректные данные для события");
        }
        const event = eventRepository.create({
            title,
            description,
            location,
            event_date,
            available_tickets,
            created_by: userId,
        });
        return await eventRepository.save(event);
    }
    catch (error) {
        console.error("Ошибка создания события:", error);
        throw new Error("Ошибка создания события");
    }
};
exports.createEvent = createEvent;
const updateEvent = async (eventId, userId, updates) => {
    try {
        const event = await eventRepository.findOneBy({ id: eventId, created_by: userId });
        if (!event)
            throw new Error("Событие не найдено или нет прав на редактирование");
        Object.assign(event, updates);
        return await eventRepository.save(event);
    }
    catch (error) {
        console.error("Ошибка обновления события:", error);
        throw new Error("Ошибка обновления события");
    }
};
exports.updateEvent = updateEvent;
const deleteExpiredEvents = async () => {
    try {
        await eventRepository.delete({ event_date: (0, typeorm_1.LessThan)(new Date()) });
    }
    catch (error) {
        console.error("Ошибка удаления старых событий:", error);
    }
};
exports.deleteExpiredEvents = deleteExpiredEvents;
