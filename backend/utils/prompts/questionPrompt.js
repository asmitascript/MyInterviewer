export const questionPrompt = ({
  role,
  experience,
  difficulty,
  previousQuestions = [],
}) => `
You are an experienced technical interviewer.

Your task is to conduct a realistic interview.

Interview Details:

Role: ${role}

Experience Level: ${experience}

Difficulty: ${difficulty}

Previously Asked Questions:

${previousQuestions.length ? previousQuestions.join("\n") : "None"}

Rules:

1. Ask ONLY ONE interview question.
2. Do NOT repeat previous questions.
3. Make the question appropriate for the experience level.
4. The question should test real understanding instead of memorization.
5. Do not explain anything.
6. Do not greet the candidate.
7. Return ONLY valid JSON.

Format:

{
  "question":"..."
}
`;