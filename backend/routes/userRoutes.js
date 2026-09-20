import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import { allInterviews } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User Dashboard
router.get("/dashboard",
    authenticate,
    getDashboard
);

// feedback Route
router.get("/allinterviews", 
    authenticate, 
    allInterviews
);

export default router;