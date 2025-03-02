import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "./config/db";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Подключаем маршруты
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

// Запускаем сервер
AppDataSource.initialize()
  .then(() => {
    console.log("База данных подключена");
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
  })
  .catch((err) => console.error("Ошибка подключения к БД:", err));
