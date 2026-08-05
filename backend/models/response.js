import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    score: Number,
    grammarScore: Number,
    communicationScore: Number,
    clarityScore: Number,

    relevance: {
      type: String,
      enum: ["High", "Medium", "Low"],
    },

    needsFollowUp: Boolean,

    missingPoints: [String],

    remarks: String,
  },
  { _id: false }
);

const responseSchema = new mongoose.Schema(
  {
    order: Number,

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
  { _id: false }
);

export default responseSchema;