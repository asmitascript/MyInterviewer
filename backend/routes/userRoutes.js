import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import { allFeedback } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User Dashboard
router.get("/dashboard",
    authenticate,
    getDashboard
);

// feedback Route
router.get("/allfeedback", 
    authenticate, 
    allFeedback
);

export default router;