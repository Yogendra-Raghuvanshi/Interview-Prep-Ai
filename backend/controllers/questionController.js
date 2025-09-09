const Question = require("../models/Question");
const Session = require("../models/Session");

//@desc Add additional questions to an existing session
//@route POST /api/questions/add
//@access Private
exports.addQuestionToSession = async (req, res) => {
    try {
        const { sessionId, questions } = req.body;

        if (!sessionId || !questions) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        // Ensure questions is an array
        const questionsArray = Array.isArray(questions) ? questions : [questions];

        // Validate each question object
        for (const q of questionsArray) {
            if (!q.question || !q.answer) {
                return res.status(400).json({ message: "Each question must have 'question' and 'answer' fields" });
            }
        }

        // Create new Questions
        const createdQuestions = await Question.insertMany(
            questionsArray.map((q) => ({
                session: sessionId,
                question: q.question,
                answer: q.answer
            }))
        );

        // Update session with new question IDs
        session.questions.push(...createdQuestions.map((q) => q._id));
        await session.save();

        res.status(201).json({ createdQuestions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

//@desc Pin or unpin a question
//@route PUT /api/questions/:id/pin
//@access Private
exports.togglePinQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ success:false,message: "Question not found" });
        }

        question.isPinned = !question.isPinned;
        await question.save();

        res.status(200).json({ message: `Question ${question.isPinned ? "pinned" : "unpinned"}`, question });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

//@desc Update note for a question
//@route PUT /api/questions/:id/note
//@access Private
exports.updateQuestionNote = async (req, res) => {
    try {
        const { note } = req.body;

        // ✅ Validate input
        if (note === undefined) {
            return res.status(400).json({ success: false, message: "Note field is required" });
        }

        // ✅ Find the question by ID
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }

        // ✅ Update note (empty string allowed if user wants to clear it)
        question.note = String(note);  
        await question.save();

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            question
        });

    } catch (error) {
        console.error("❌ Error updating note:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
