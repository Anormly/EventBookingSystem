import { AppDataSource } from "../config/db";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET: Secret = process.env.JWT_SECRET || "default_secret";
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "1h";

const userRepository = AppDataSource.getRepository(User);

// Функция генерации токена
export const generateToken = (payload: object): string => {
  console.log("Создание токена с секретом:", JWT_SECRET);
  console.log("Время жизни токена:", JWT_EXPIRES_IN);

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as SignOptions["expiresIn"] });
};

// Регистрация пользователя
export const registerUser = async (email: string, username: string, password: string) => {
  const existingUser = await userRepository.findOne({ where: [{ email }, { username }] });
  if (existingUser) throw new Error("Пользователь с таким email или username уже существует");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = userRepository.create({ email, username, password: hashedPassword });
  await userRepository.save(newUser);

  const token = generateToken({ id: newUser.id, email: newUser.email, username: newUser.username });
  return { user: newUser, token };
};

// Авторизация пользователя
export const loginUser = async (emailOrUsername: string, password: string) => {
  const user = await userRepository.findOne({
    where: [{ email: emailOrUsername }, { username: emailOrUsername }],
  });

  if (!user) throw new Error("Неверный email/username или пароль");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Неверный email/username или пароль");

  const token = generateToken({ id: user.id, email: user.email, username: user.username });
  return { user, token };
};
