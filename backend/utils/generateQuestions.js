import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

import { questionPrompt } from "./prompts/questionPrompt.js";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateQuestion = async ({
  role,
  experience,
  difficulty,
  interviewType,
  previousQuestions = [],
}) => {
  try {
    const prompt = questionPrompt({
      role,
      experience,
      difficulty,
      interviewType,
      previousQuestions,
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
    console.error("Generate Question Error:", err);

    throw new Error("Failed to generate interview question.");
  }
};

export default generateQuestion;