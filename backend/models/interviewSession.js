import mongoose from "mongoose";
import responseSchema from "./response.js";


const finalFeedbackSchema = new mongoose.Schema(
  {
    overallScore: {
        type: Number,
        min: 0,
        max: 10
    },

    technicalScore: {
        type: Number,
        min: 0,
        max: 10
    },

    communicationScore: {
        type: Number,
        min: 0,
        max: 10
    },

    grammarScore: {
        type: Number,
        min: 0,
        max: 10
    },

    strengths: [String],

    improvements: [String],

    summary: String,

    suggestedPreparation: [String],
  },
  { _id: false }
);

const interviewSessionSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["Ongoing", "Completed", "Terminated"],
      default: "Ongoing",
    },

    currentQuestionIndex: {
    type: Number,
    default: 0,
    },

    maxQuestions: {
      type: Number,
      default: 8,
    },

    responses: {
        type: [responseSchema],
        default: [],
    },

    finalFeedback: finalFeedbackSchema,

    startedAt: {
      type: Date,
      default: Date.now,
    },

    endedAt: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "InterviewSession",
  interviewSessionSchema
);