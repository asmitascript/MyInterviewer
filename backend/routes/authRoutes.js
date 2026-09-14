import { registerUser } from "../controllers/authController.js";

import express, { response } from "express";

const router = express.Router();

router.post("/register", registerUser);

export default router;