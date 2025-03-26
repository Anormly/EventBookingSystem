import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createEvent, updateEvent, getActiveEvents } from "../services/event.service";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
    try {
        const events = await getActiveEvents();
        res.json(events);
    } catch (error) {
        console.error("Ошибка получения событий:", error);
        res.status(500).json({ error: "Ошибка при получении событий" });
    }
});

router.post("/", authMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Пользователь не аутентифицирован" });
            return;
        }

        const { title, description, event_date, location, available_tickets } = req.body;

        if (!title || !event_date || !available_tickets) {
            res.status(400).json({ error: "Некорректные данные для события" });
            return;
        }

        const event = await createEvent(
            req.user.id,
            title,
            description,
            new Date(event_date),
            location,
            available_tickets
        );

        res.status(201).json(event); 
    } catch (error) {
        console.error("Ошибка создания события:", error);
        res.status(500).json({ error: "Ошибка при создании события" });
    }
});


router.put("/:id", authMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Пользователь не аутентифицирован" });
            return;
        }

        const eventId = Number(req.params.id);
        if (isNaN(eventId)) {
            res.status(400).json({ error: "Некорректный ID события" });
            return;
        }

        const updatedEvent = await updateEvent(eventId, req.user.id, req.body);
        res.json(updatedEvent);
    } catch (error) {
        console.error("Ошибка обновления события:", error);
        res.status(500).json({ error: "Ошибка при обновлении события" });
    }
});

export default router;
