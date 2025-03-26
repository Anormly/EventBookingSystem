"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = await (0, auth_service_1.registerUser)(email, username, password);
        res.status(201).json({ message: "Пользователь зарегистрирован", user });
    }
    catch (error) {
        console.error("Ошибка регистрации:", error);
        const message = error instanceof Error ? error.message : "Неизвестная ошибка";
        res.status(400).json({ error: message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;
        const { user, token } = await (0, auth_service_1.loginUser)(emailOrUsername, password);
        res.json({ message: "Успешный вход", user, token });
    }
    catch (error) {
        console.error("Ошибка входа:", error);
        const message = error instanceof Error ? error.message : "Неизвестная ошибка";
        res.status(400).json({ error: message });
    }
};
exports.login = login;
