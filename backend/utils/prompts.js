// const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions)=>`
//     You are an AI trained to generate technical interview questions and answers.

//     Task:
//     - Role: ${role}
//     - Candidate Experience: ${experience} years
//     - Focus Topics: ${topicsToFocus}
//     - Write ${numberOfQuestions} interview questions.
//     - For each question, generate a detailed but beginner-friendly answer.
//     - If the answer needs a code examples , add a small code block inside.
//     - Keep formatting very clean.
//     - Return a pure JSON array like:
//   [
//     {
//        "question": "Question here?",
//        "answer": "Answer here."
//     },
//     ...
//   ]
//   Important: Do Not add any extra text. Only return valid JSON.

// `;

// const conceptExplainPrompt = (question)=> `
//     You are an AI trained to generate explanations for given interview questions.
      
    
//      Task:

//      - Explain the following interview question and its concepts in depth as if you're teaching a beginner developer.
//      - Question: "${question}"
//      - After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
//      - If the explanation requires code examples, provide a small code block.
//      - keep formatting very clean and clear.
//      - Return the result as a valid Json object in the following format:
//      {
//        "title": "Short title here?",
//        "explanation": "Explanation here."
//      }
//     `;

//     module.exports = {
//         questionAnswerPrompt,
//         conceptExplainPrompt,
//     };