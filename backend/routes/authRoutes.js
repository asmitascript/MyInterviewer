import { loginUser, registerUser } from "../controllers/authController.js";

import express, { response } from "express";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;