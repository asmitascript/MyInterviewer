import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    score: {
      type: Number,
      min: 0,
      max: 10,
    },

    technicalScore: {
      type: Number,
      min: 0,
      max: 10,
    },

    grammarScore: {
      type: Number,
      min: 0,
      max: 10,
    },

    communicationScore: {
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

    missingPoints: [
      {
        type: String,
      },
    ],

    needsFollowUp: {
      type: Boolean,
      default: false,
    },

    analysisSummary: {
      type: String,
    },
  },
  { _id: false }
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
      required: true,
    },

    questionType: {
      type: String,
      enum: ["Normal", "FollowUp"],
      default: "Normal",
    },

    analysis: analysisSchema,
  },
  { timestamps: true, _id: false }
);


export default responseSchema;