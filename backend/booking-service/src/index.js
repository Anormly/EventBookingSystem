"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const event_routes_1 = __importDefault(require("./routes/event.routes"));
const booking_routes_1 = __importDefault(require("./routes/booking.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Роуты
app.use("/api/events", event_routes_1.default);
app.use("/api/bookings", booking_routes_1.default);
const PORT = process.env.PORT || 5001;
db_1.AppDataSource.initialize()
    .then(() => {
    console.log("База данных подключена");
    app.listen(PORT, () => console.log(`Booking service запущен на порту ${PORT}`));
})
    .catch((err) => console.error("Ошибка подключения к БД:", err));
