import { loginUser, logoutUser, registerUser } from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

import express, { response } from "express";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", authenticate, logoutUser)

router.get("/me", authenticate, (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
    },
  });
});
export default router;



