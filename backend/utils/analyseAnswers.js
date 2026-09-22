import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

import { analysisPrompt } from "./prompts/analysisPrompt.js";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateAnalysis = async ({ question, answer }) => {
  try {
    const prompt = analysisPrompt({
      question,
      answer,
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
    console.error("Generate Analysis Error:", err);

    throw new Error("Failed to analyze interview response.");
  }
};

export default generateAnalysis;
