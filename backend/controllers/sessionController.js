const Session = require("../models/Session");
const Question = require("../models/Question");

// @desc Create a new session and linked questions
// @route POST /api/sessions/create
// @access Private
exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body;
    const userId = req.user._id; // populated by auth middleware

    // Create session
    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    // Insert related questions if provided
    if (questions && Array.isArray(questions)) {
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
    }

    res.status(201).json({ success: true, session });
  } catch (error) {
    console.error("❌ Error creating session:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc Get all sessions for the logged-in user
// exports.getMySessions = async (req, res) => {
//   try {
//     const sessions = await Session.find({ user: req.user._id })
//       .populate("questions")
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, sessions });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };
// const Session = require("../models/sessionModel");

exports.getMySessions = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      console.error("❌ req.user missing in getMySessions");
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    console.log("👉 Fetching sessions for user:", req.user._id);

    const sessions = await Session.find({ user: req.user._id })
      .populate("questions")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, sessions });
  } catch (error) {
    console.error("❌ Error in getMySessions:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc Get a single session by ID
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate("questions");

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    if (session.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    res.status(200).json({ success: true, session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc Delete a session by ID
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    if (session.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    // Delete related questions
    await Question.deleteMany({ session: session._id });

    await session.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Session deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
