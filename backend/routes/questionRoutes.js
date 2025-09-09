const express = require("express");
const { togglePinQuestion, updateQuestionNote, addQuestionToSession } = require("../controllers/questionController");
const { protect } = require("../middlewares/authMiddleware"); // <-- import protect

const router = express.Router();

router.post('/add', protect, addQuestionToSession);
router.put('/:id/pin', protect, togglePinQuestion);
router.put('/:id/note', protect, updateQuestionNote);

module.exports = router;
