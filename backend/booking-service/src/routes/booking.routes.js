"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const booking_service_1 = require("../services/booking.service");
const router = express_1.default.Router();
router.post("/:eventId", auth_middleware_1.authMiddleware, async (req, res) => {
    if (!req.user) {
        res.status(401).json({ error: "Пользователь не аутентифицирован" });
        return;
    }
    try {
        const eventId = Number(req.params.eventId);
        const userId = req.user.id;
        const booking = await (0, booking_service_1.bookTicket)(eventId, userId);
        res.json(booking);
    }
    catch (error) {
        console.error("Ошибка бронирования:", error);
        res.status(500).json({ error: "Ошибка при бронировании" });
    }
});
exports.default = router;
