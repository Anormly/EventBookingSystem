import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Event } from "../models/Event";
import { MoreThan, LessThan } from "typeorm";

const eventRepository = AppDataSource.getRepository(Event);


export const getActiveEvents = async (): Promise<Partial<Event>[]> => {
    try {
        const events = await eventRepository
            .createQueryBuilder("event")
            .where("event.event_date > :now", { now: new Date() })
            .select([
                "event.id",
                "event.title",
                "event.description",
                "event.event_date",
                "event.available_tickets",
                "event.created_by", // ✅ Передаем как число
            ])
            .getMany();

        return events;
    } catch (error) {
        console.error("Ошибка при получении событий:", error);
        return [];
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
