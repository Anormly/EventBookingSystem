"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const event_service_1 = require("../services/event.service");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const events = await (0, event_service_1.getActiveEvents)(req, res);
        res.json(events);
    }
    catch (error) {
        console.error("Ошибка получения событий:", error);
        res.status(500).json({ error: "Ошибка при получении событий" });
    }
});
router.post("/", auth_middleware_1.authMiddleware, async (req, res) => {
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
        const event = await (0, event_service_1.createEvent)(req.user.id, title, description, new Date(event_date), location, available_tickets);
        res.status(201).json(event);
    }
    catch (error) {
        console.error("Ошибка создания события:", error);
        res.status(500).json({ error: "Ошибка при создании события" });
    }
});
router.put("/:id", auth_middleware_1.authMiddleware, async (req, res) => {
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
        const updatedEvent = await (0, event_service_1.updateEvent)(eventId, req.user.id, req.body);
        res.json(updatedEvent);
    }
    catch (error) {
        console.error("Ошибка обновления события:", error);
        res.status(500).json({ error: "Ошибка при обновлении события" });
    }
});
exports.default = router;
