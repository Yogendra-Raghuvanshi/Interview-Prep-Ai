const Question = require("../models/Question");
const Session = require("../models/Session");

//@desc Add questions to a session
//@route POST /api/questions/add
//@access Private
const addQuestionsToSession = async (req, res) => {
    try {
        const { sessionId, questions } = req.body;

        if(!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ message: "Invalid input data " });
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }
   // Create new questions 
   const createdQuestions = await Question.insertMany(
    questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
    }))
   );
  // Update seession to include new question IDs
    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    res.status(201).json({createdQuestions});
   

    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

// @desc Pin or Unpin a question
// @route POST /api/questions/:id/pin
// @access Private
const togglePinQuestion = async (req, res) => {};


//@desc update note for a question
//@route POST /api/questions/:id/note
//@access Private
const updateQuestionNote = async (req, res) => {};
     
module.exports = {
    addQuestionsToSession,
    togglePinQuestion,
    updateQuestionNote
};