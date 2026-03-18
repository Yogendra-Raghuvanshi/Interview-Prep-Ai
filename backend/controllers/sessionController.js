const Session = require("../models/Session");
const Question = require("../models/Question");

//@desc Create a new session
//@route POST /api/sessions/create
//@access Private
const createSession = async (req, res) => {
    try {
         console.log("BODY:", req.body);  
        console.log("USER:", req.user);   
        const { role, experience, topicsToFocus, description, questions } = req.body;

        // ✅ fix 1: check user
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userId = req.user._id;

        // ✅ fix 2: default questions
        const safeQuestions = questions || [];

        // Create session
        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description,
        });

        // Create questions
        const questionDocs = await Promise.all(
            safeQuestions.map((q) => {
                return Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                });
            })
        );

        // Save question IDs
        session.questions = questionDocs.map(q => q._id);
        await session.save();

        res.status(201).json({ success: true, session });

    } catch (error) {
    console.log("ERROR:", error);   // 👈 यह add करो
    res.status(500).json({
        success: false,
        message: error.message     // 👈 यह भी change करो
    });
}
};


//@desc Get session by ID
//@route GET /api/sessions/my-sessions
//@access Private
const getMySession = async (req, res) => {
     try {
 const  sessions = await Session.find({ user: req.user._id })
 .sort({ createdAt: -1 })
 .populate("questions");
 res.status(200).json({ sessions });
    }catch (error) {
        res.status(500).json({success: false, message: "Server error" });
    }
};

//@desc Get all sessions for the logged-in user
//@route GET /api/sessions/:id
//@access Private
const getSessionsById = async (req, res) => {
     try {

    }catch (error) {
        res.status(500).json({success: false, message: "Server error" });
    }
};

//@desc Delete a session
//@route DELETE /api/sessions/:id
//@access Private
const deleteSession = async (req, res) => {
     try {

    }catch (error) {
        res.status(500).json({success: false, message: "Server error" });
    }
};

module.exports = { createSession, getSessionsById, getMySession, deleteSession};