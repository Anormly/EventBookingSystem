import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST, 
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false, 
    logging: true,
    migrations: [__dirname + "/../migrations/*.js"],
    entities: [__dirname + "/../models/*.js"],
});


AppDataSource.initialize()
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection error", err));
