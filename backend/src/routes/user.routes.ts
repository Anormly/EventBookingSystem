import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: `Личный кабинет ${req.user.username}`, user: req.user });
});

export default router;
