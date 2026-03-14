const mongoose = require("mongoose");
const User = require("./User");

const sessionSchema = new mongoose.Schema({
    User: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    role: {type: String, required: true},
    experience: {type: String, required: true},
    topicsToFocus: {type: String, required: true},
    description: String,
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
}, { timestamps: true });

module.exports = mongoose.model("Session", sessionSchema);