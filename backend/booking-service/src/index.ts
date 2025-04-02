import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "./config/db";
import eventRoutes from "./routes/event.routes";
import bookingRoutes from "./routes/booking.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger.json";
import bookingRouter from './routes/booking.routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Роуты
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use('/api/bookings', bookingRouter);

const PORT = process.env.PORT || 5001;

AppDataSource.initialize()
    .then(() => {
        console.log("База данных подключена");
        app.listen(PORT, () => console.log(`Booking service запущен на порту ${PORT}`));
    })
    .catch((err: Error) => console.error("Ошибка подключения к БД:", err));
