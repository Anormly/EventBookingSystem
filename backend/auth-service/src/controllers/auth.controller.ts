import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    const user = await registerUser(email, username, password);
    res.status(201).json({ message: "Пользователь зарегистрирован", user });
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    const message = error instanceof Error ? error.message : "Неизвестная ошибка";
    res.status(400).json({ error: message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { emailOrUsername, password } = req.body;
    const { user, token } = await loginUser(emailOrUsername, password);
    res.json({ message: "Успешный вход", user, token });
  } catch (error) {
    console.error("Ошибка входа:", error);
    const message = error instanceof Error ? error.message : "Неизвестная ошибка";
    res.status(400).json({ error: message });
  }
};
