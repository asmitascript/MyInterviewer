export const analysisPrompt = ({
  question,
  answer,
}) => `
You are an expert interview evaluator.

Question:
${question}

Candidate Answer:
${answer}

Analyze the answer.

Evaluate:
1. Technical correctness
2. Relevance
3. Grammar
4. Communication
5. Clarity
6. Confidence
7. Strengths
8. Weaknesses
9. Missing concepts

Then decide whether another follow-up question is required.

Return ONLY valid JSON.

{
  "overallScore":0,
  "technicalScore":0,
  "grammarScore":0,
  "communicationScore":0,
  "clarityScore":0,
  "relevance":"High",
  "strengths":[
    "...",
    "..."
  ],
  "weaknesses":[
    "...",
    "..."
  ],
  "missingPoints":[
    "..."
  ],
  "needsFollowUp":true,
  "analysisSummary":"..."
}

Rules:
- All scores must be between 0 and 10.
- strengths MUST contain 1 to 2 concise points.
- weaknesses MUST contain 1 to 2 concise points.
- missingPoints MUST contain every important concept the candidate missed.
- Never return empty arrays for strengths or weaknesses.
- Base every point only on the candidate's answer.
- Do not generate any interview question.
- Return JSON only.
`;