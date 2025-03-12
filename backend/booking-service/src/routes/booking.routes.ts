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
    res.json(booking);
  } catch (error) {
    console.error("Ошибка бронирования:", error);
    res.status(500).json({ error: "Ошибка при бронировании" });
  }
});

export default router;
