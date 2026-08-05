export const finalFeedbackPrompt = ({
  role,
  interviewHistory,
}) => `
You are a senior ${role} interviewer.

Evaluate the ENTIRE interview.

Interview History:

${interviewHistory}

Evaluate the candidate on:

- Technical Knowledge
- Communication
- Grammar
- Overall Performance

Provide constructive feedback.

Return ONLY valid JSON in this exact format:

{
  "overallScore": 0,
  "technicalScore": 0,
  "communicationScore": 0,
  "grammarScore": 0,
  "strengths": [],
  "improvements": [],
  "summary": "",
  "suggestedPreparation": []
}

Rules:

- Scores must be between 0 and 10.
- Summary must be under 120 words.
- Strengths should be concise.
- Improvements should be actionable.
- SuggestedPreparation should contain topics or skills to practice.
- Return ONLY JSON.
`;