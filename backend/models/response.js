import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
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

    clarityScore: {
      type: Number,
      min: 0,
      max: 10,
    },

    relevance: {
      type: String,
      enum: ["High", "Medium", "Low"],
    },

    strengths: [
      {
        type: String,
      },
    ],

    weaknesses: [
      {
        type: String,
      },
    ],

    missingPoints: [
      {
        type: String,
      },
    ],

    needsFollowUp: {
      type: Boolean,
      default: false,
    },

    summary: {
      type: String,
    },
  },
  {
    _id: false,
  }
);

const responseSchema = new mongoose.Schema(
  {
    order: {
      type: Number,
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      default: "",
    },

    questionType: {
      type: String,
      enum: ["Normal", "FollowUp"],
      default: "Normal",
    },

    analysis: {
      type: analysisSchema,
      default: null,
    },
  },
  {
    _id: false,
    timestamps: true,
  }
);

export default responseSchema;