import mongoose from "mongoose";
import responseSchema from "./response.js";

const finalFeedbackSchema = new mongoose.Schema(
  {
    overallScore: {
      type: Number,
      min: 0,
      max: 10,
    },

    technicalScore: {
      type: Number,
      min: 0,
      max: 10,
    },

    communicationScore: {
      type: Number,
      min: 0,
      max: 10,
    },

    grammarScore: {
      type: Number,
      min: 0,
      max: 10,
    },

    strengths: [
      {
        type: String,
      },
    ],

    improvements: [
      {
        type: String,
      },
    ],

    summary: {
      type: String,
    },

    suggestedPreparation: [
      {
        type: String,
      },
    ],
  },
  {
    _id: false,
  }
);

const interviewSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      enum: ["fresher", "junior", "mid", "senior"],
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },

    interviewType: {
      type: String,
      enum: ["Technical", "HR", "Behavioral"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Ongoing", "Completed", "Terminated"],
      default: "Ongoing",
    },

    currentQuestionNumber: {
      type: Number,
      default: 1,
    },

    maxQuestions: {
      type: Number,
      default: 10,
    },

    responses: {
      type: [responseSchema],
      default: [],
    },

    finalFeedback: {
      type: finalFeedbackSchema,
      default: null,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    endedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("InterviewSession", interviewSessionSchema);