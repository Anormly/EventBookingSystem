"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.get("/profile", auth_middleware_1.authMiddleware, (req, res) => {
    res.json({ message: `Личный кабинет ${req.user.username}`, user: req.user });
});
exports.default = router;
