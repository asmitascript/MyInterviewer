export const followupPrompt = ({
  question,
  answer,
  missingPoints,
}) => `
You are conducting a technical interview.

Original Question:

${question}

Candidate Answer:

${answer}

The candidate missed these important concepts:

${missingPoints.join(", ")}

Generate ONE follow-up question.

Rules:

1. Ask only one question.
2. The question must focus only on the missing concepts.
3. Do not change the interview topic.
4. Do not explain anything.
5. Return JSON only.

Format:

{
   "question":"..."
}
`;