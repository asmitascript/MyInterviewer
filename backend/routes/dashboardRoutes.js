import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import { authenticate, authorised } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/dashboard",
    authenticate,
    getDashboard
);

export default router;