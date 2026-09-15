import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:userId/dashboard", authenticate, getDashboard);

export default router;