"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./config/swagger.json"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
// Подключаем маршруты
app.use("/api/auth", auth_routes_1.default);
app.use("/api/user", user_routes_1.default);
const PORT = process.env.PORT || 5000;
// Запускаем сервер
db_1.AppDataSource.initialize()
    .then(() => {
    console.log("База данных подключена");
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
})
    .catch((err) => console.error("Ошибка подключения к БД:", err));
