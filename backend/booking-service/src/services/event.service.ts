import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Event } from "../models/Event";
import { MoreThan, LessThan } from "typeorm";

const eventRepository = AppDataSource.getRepository(Event);

export const getActiveEvents = async (): Promise<Event[]> => {
    try {
        return await eventRepository.find({
            where: {
                event_date: MoreThan(new Date())
            },
            order: {
                event_date: "ASC"
            }
        });
    } catch (error) {
        console.error("Ошибка при получении событий:", error);
        return [];
    }
};

export const createEvent = async (created_by: number, title: string, description: string, event_date: Date, location: string, available_tickets: number) => {
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
            created_by,
        });

        const savedEvent = await eventRepository.save(event);
        
        // Возвращаем событие с преобразованной датой
        return {
            ...savedEvent,
            event_date: savedEvent.event_date.toISOString()
        };
    } catch (error) {
        console.error("Ошибка создания события:", error);
        throw new Error("Ошибка создания события");
    }
};

export const updateEvent = async (event_id: number, created_by: number, updates: Partial<Event>) => {
    try {
        const event = await eventRepository.findOneBy({ id: event_id, created_by });
        if (!event) throw new Error("Событие не найдено или нет прав на редактирование");

        Object.assign(event, updates);
        const updatedEvent = await eventRepository.save(event);
        
        return {
            ...updatedEvent,
            event_date: updatedEvent.event_date.toISOString()
        };
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
