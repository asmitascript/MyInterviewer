import express from "express";

import { loginUser, logoutUser, registerUser } from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { registerUserSchema, loginUserSchema } from "../validations/authValidation.js";

const router = express.Router();

router.post("/register", 
  validate(registerUserSchema),
  registerUser
);

router.post("/login", 
  validate(loginUserSchema),
  loginUser
);

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



