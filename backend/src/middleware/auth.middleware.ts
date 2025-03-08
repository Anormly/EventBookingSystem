import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model";
import { AppDataSource } from "../config/db";

const userRepository = AppDataSource.getRepository(User)

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

// Middleware для проверки токена
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Нет доступа, авторизуйтесь" });
    return; 
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(401).json({ error: "Неверный или просроченный токен" });
    return; 
  }
};
