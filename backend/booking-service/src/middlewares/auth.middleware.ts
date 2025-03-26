import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// 🛠 Расширяем интерфейс Express Request
declare module "express-serve-static-core" {
  interface Request {
    user?: { id: number; email: string; username: string };
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];
  
    if (!token) {
      res.status(401).json({ error: "Нет токена, авторизация запрещена" });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; username: string };
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ error: "Неверный или просроченный токен" });
    }
  };
  
