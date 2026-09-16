import jwt from "jsonwebtoken";
import User from "../models/user.js";
import InterviewSession from "../models/interviewSession.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Not authenticated",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export const authorised = async (req, res, next) => {
    try {
        const { sessionId } = req.params;

        const interview = await InterviewSession.findById(sessionId);

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview Not Found",
            });
        }

        if (interview.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this interview",
            });
        }

        req.interview = interview;

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Authorization failed",
        });
    }
};