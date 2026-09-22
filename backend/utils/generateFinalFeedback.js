import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

import { finalFeedbackPrompt } from "./prompts/finalFeedbackPrompt.js";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateFinalFeedback = async (interview) => {
  try {
    const interviewHistory = interview.responses
      .map(
        (response, index) => `
Interview Exchange ${index + 1}:

Question:
${response.question}

Candidate Answer:
${response.answer}

Answer Analysis:
${JSON.stringify(response.analysis, null, 2)}
`
      )
      .join("\n-----------------------------\n");

    const prompt = finalFeedbackPrompt({
      role: interview.role,
      interviewHistory,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    const text = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);
  } catch (err) {
    console.error("Generate Final Feedback Error:", err);
    throw new Error("Failed to generate final interview feedback.");
  }
};

export default generateFinalFeedback;
