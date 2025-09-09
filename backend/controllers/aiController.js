const { GoogleGenerativeAI } = require("@google/generative-ai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// @desc Generate interview questions using AI
// @route POST /api/ai/generate-questions
// @access Private
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

    // ✅ Correct way to call Gemini
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const rawText = await result.response.text();

    // Clean response: remove ```json and ```
    const cleanedText = rawText
      .replace(/```json\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    const data = JSON.parse(cleanedText);
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

// @desc Generate explanation of an interview concept using AI
// @route POST /api/ai/generate-explanations
// @access Private
const generateConceptExplanation = async (req, res) => {
  // to be implemented
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required field: question" });
    }

    const prompt = conceptExplainPrompt(question);

    // ✅ Correct way to call Gemini
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const rawText = await result.response.text();

    // Clean response: remove ```json and ```
    const cleanedText = rawText
      .replace(/```json\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    const data = JSON.parse(cleanedText);
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }   
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };
