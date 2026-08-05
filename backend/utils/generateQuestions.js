import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateFeedback(question, answer) {

const prompt = `
You are an experienced technical interviewer.

Interview Question:
${question}

Candidate Answer:
${answer}

Analyze the answer and return ONLY valid JSON.

Format:
{
  "overallScore": 0,
  "communication": 0,
  "technicalKnowledge": 0,
  "clarity": 0,
  "strengths": [],
  "weaknesses": [],
  "suggestions": "",
  "improvedAnswer": ""
}

Do not include markdown or extra text.

Return the response in JSON.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  return response.text;
}
