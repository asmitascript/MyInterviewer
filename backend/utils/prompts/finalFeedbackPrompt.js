export const finalFeedbackPrompt = ({
  role,
  interviewHistory,
}) => `
You are a senior technical interviewer.

Evaluate the ENTIRE interview.

Role:

${role}

Interview:

${interviewHistory}

Evaluate:

Technical Knowledge

Problem Solving

Communication

Grammar

Confidence

Overall Performance

Provide constructive feedback.

Return ONLY JSON.

{
  "overallScore":0,
  "technicalScore":0,
  "communicationScore":0,
  "grammarScore":0,
  "confidenceScore":0,
  "strengths":[
  ],
  "improvementsNeeded":[
  ],
  "summary":"",
  "preparationTips":[
  ]
}

Rules:

Scores must be between 0 and 10.

Summary should be under 120 words.

Preparation tips should be practical.

Return JSON only.
`;