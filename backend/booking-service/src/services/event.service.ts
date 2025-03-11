import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Event } from "../models/Event";
import { MoreThan, LessThan } from "typeorm";

const eventRepository = AppDataSource.getRepository(Event);


export const getActiveEvents = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const events = await eventRepository.find({
            where: { event_date: MoreThan(new Date()) },
        });
        return res.json(events); 
    } catch (error) {
        console.error("Ошибка при получении событий:", error);
        return res.status(500).json({ error: "Ошибка при получении событий" }); 
    }
};

export const createEvent = async (userId: number, title: string, description: string, event_date: Date, location: string, available_tickets: number) => {
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
    } catch (error) {
        console.error("Ошибка создания события:", error);
        throw new Error("Ошибка создания события");
    }
};

export const updateEvent = async (eventId: number, userId: number, updates: Partial<Event>) => {
    try {
        const event = await eventRepository.findOneBy({ id: eventId, created_by: userId });
        if (!event) throw new Error("Событие не найдено или нет прав на редактирование");

        Object.assign(event, updates);
        return await eventRepository.save(event);
    } catch (error) {
        console.error("Ошибка обновления события:", error);
        throw new Error("Ошибка обновления события");
    }
};


export const deleteExpiredEvents = async (): Promise<void> => {
    try {
        await eventRepository.delete({ event_date: LessThan(new Date()) });
    } catch (error) {
        console.error("Ошибка удаления старых событий:", error);
    }
};
