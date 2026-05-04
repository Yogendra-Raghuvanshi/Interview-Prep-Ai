const { GoogleGenAI } = require("@google/genai");
const { conceptExplanationPrompt, questionAnswerPrompt } = require("../utils/prompts");

// ✅ ADD THIS (fallback)
const fallbackQuestions = require("../utils/fallbackQuestions");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


//@desc Generate interview questions using AI
//@route POST /api/ai/generate-questions
//@access Private
// ✅ FIX: wrap in function
const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const prompt = questionAnswerPrompt(
            role,
            experience,
            topicsToFocus,
            numberOfQuestions
        );

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        let rawText = response.candidates[0].content.parts[0].text;

        const cleanedText = rawText
            .replace(/^```json\s*/, "")
            .replace(/```$/, "")
            .trim();

        const data = JSON.parse(cleanedText);

        return res.status(200).json({
            source: "ai",
            data
        });

    } catch (error) {
        console.error("AI ERROR:", error.message);

        // 🔥 ADD FALLBACK HERE
        const { role, topicsToFocus, numberOfQuestions } = req.body;

        const fallback = fallbackQuestions(
            role,
            topicsToFocus,
            numberOfQuestions || 5
        );

        return res.status(200).json({
            source: "fallback",
            data: fallback
        });
    }
};



//@desc Generate explanations for an interview question using AI
//@route POST /api/ai/generate-explanations
//@access Private
const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                message: "Question is required"
            });
        }

        // ❌ FIX TYPO HERE
        const prompt = conceptExplanationPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        let rawText = response.candidates[0].content.parts[0].text;

        const cleanedText = rawText
            .replace(/^```json\s*/, "")
            .replace(/```$/, "")
            .trim();

        const data = JSON.parse(cleanedText);

        return res.status(200).json({
            source: "ai",
            data
        });

    } catch (error) {
        console.error("AI ERROR:", error.message);

        // 🔥 SIMPLE FALLBACK FOR EXPLANATION
        return res.status(200).json({
            source: "fallback",
            data: {
                explanation: "Unable to fetch AI explanation right now. Please try again later."
            }
        });
    }
};


// ✅ EXPORT FIXED
module.exports = {
    generateInterviewQuestions,
    generateConceptExplanation,
};