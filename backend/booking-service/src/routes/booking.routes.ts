import express, { Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { bookTicket } from "../services/booking.service";

const router = express.Router();

router.post("/:eventId", authMiddleware, async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ error: "Пользователь не аутентифицирован" });
        return;
    }

    try {
        const eventId = Number(req.params.eventId);
        if (isNaN(eventId)) {
            res.status(400).json({ error: "Некорректный ID события" });
            return;
        }

        const userId = req.user.id;
        const booking = await bookTicket(eventId, userId);
        
        res.status(201).json({
            message: "Билет успешно забронирован",
            booking,
        });
    } catch (error) {
        console.error("Ошибка бронирования:", error);

        let statusCode = 500;
        let errorMessage = "Ошибка при бронировании";

        if (error instanceof Error) {
            errorMessage = error.message;

            if (error.message === "Событие не найдено" || error.message === "Пользователь не найден") {
                statusCode = 404;
            } else if (error.message === "Нет доступных билетов" || error.message === "Вы уже забронировали билет на это событие") {
                statusCode = 400;
            }
        }

        res.status(statusCode).json({ error: errorMessage });
    }
});

export default router;