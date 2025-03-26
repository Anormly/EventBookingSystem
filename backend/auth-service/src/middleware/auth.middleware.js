"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = require("../models/user.model");
const db_1 = require("../config/db");
const userRepository = db_1.AppDataSource.getRepository(user_model_1.User);
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
// Middleware для проверки токена
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Нет доступа, авторизуйтесь" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Неверный или просроченный токен" });
        return;
    }
};
exports.authMiddleware = authMiddleware;
