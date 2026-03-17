const Session = require("../models/Session");
const Question = require("../models/Question");

//@desc Create a new session
//@route POST /api/sessions/create
//@access Private
const createSession = async (req, res) => {
    try {
     const { role, experience, topicToFocus, description, questions} =
        req.body;
       const userId = req.user._id;

    // Create a new session
    const session = await Session.create({
        user: userId,
        role,
        experience,
        topicToFocus,
        description,
    });

    const questionDocs = await Promise.all(
           questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                });
                return question._id;
            })
    );

    session.questions = questionDocs;
    await session.save();
    
    res.status(201).json({ success: true, session });
    } catch (error) {
        res.status(500).json({success: false, message: "Server error" });
    }
};


//@desc Get session by ID
//@route GET /api/sessions/my-sessions
//@access Private
const getMySession = async (req, res) => {
     try {

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