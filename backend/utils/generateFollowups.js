import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

import { followupPrompt } from "./prompts/followupPrompt.js";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateFollowupQuestion = async ({
  question,
  answer,
  missingPoints = [],
}) => {
  try {
    const prompt = followupPrompt({
      question,
      answer,
      missingPoints,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    const text = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);
  } catch (err) {
    console.error("Generate Follow-up Question Error:", err);

    throw new Error("Failed to generate follow-up interview question.");
  }
};

export default generateFollowupQuestion;
