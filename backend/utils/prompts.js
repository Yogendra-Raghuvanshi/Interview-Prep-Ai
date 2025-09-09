const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (`
You are an AI trained to generate technical interview questions and answers.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Write exactly ${numberOfQuestions} interview questions.
- For each question, generate a detailed but beginner-friendly answer.
- If the answer needs a code example, add a small code block inside.
- Keep formatting very clean.

⚠️ STRICT INSTRUCTIONS:
Return ONLY a valid JSON array.
Do not add any extra text, markdown, explanations, or comments.
Do not wrap in \`\`\`json or any other tags.

The output format must be exactly:

[
  {
    "question": "Question here?",
    "answer": "Answer here."
  }
]
`);

const conceptExplainPrompt = (question) => (`
You are an AI trained to generate explanations for a given interview question.

Task:
- Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
- Question: "${question}"
- After the explanation, provide a short and clear title that summarizes the concept.
- If the explanation includes a code example, provide a small code block.
- Keep the formatting very clean.

⚠️ STRICT INSTRUCTIONS:
Return ONLY a valid JSON object.
Do not add any extra text, markdown, explanations, or comments.
Do not wrap in \`\`\`json or any other tags.

The output format must be exactly:

{
  "title": "Short and clear title here",
  "explanation": "Detailed explanation here."
}
`);

module.exports = { questionAnswerPrompt, conceptExplainPrompt };
