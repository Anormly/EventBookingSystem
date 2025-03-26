"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = exports.generateToken = void 0;
const db_1 = require("../config/db");
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
const userRepository = db_1.AppDataSource.getRepository(user_model_1.User);
// Функция генерации токена
const generateToken = (payload) => {
    console.log("Создание токена с секретом:", JWT_SECRET);
    console.log("Время жизни токена:", JWT_EXPIRES_IN);
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
exports.generateToken = generateToken;
// Регистрация пользователя
const registerUser = async (email, username, password) => {
    const existingUser = await userRepository.findOne({ where: [{ email }, { username }] });
    if (existingUser)
        throw new Error("Пользователь с таким email или username уже существует");
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const newUser = userRepository.create({ email, username, password: hashedPassword });
    await userRepository.save(newUser);
    const token = (0, exports.generateToken)({ id: newUser.id, email: newUser.email, username: newUser.username });
    return { user: newUser, token };
};
exports.registerUser = registerUser;
// Авторизация пользователя
const loginUser = async (emailOrUsername, password) => {
    const user = await userRepository.findOne({
        where: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (!user)
        throw new Error("Неверный email/username или пароль");
    const isValid = await bcrypt_1.default.compare(password, user.password);
    if (!isValid)
        throw new Error("Неверный email/username или пароль");
    const token = (0, exports.generateToken)({ id: user.id, email: user.email, username: user.username });
    return { user, token };
};
exports.loginUser = loginUser;
