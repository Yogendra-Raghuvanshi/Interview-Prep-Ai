const fallbackQuestions = (role, topics, count = 5) => {
    const base = [
        "What are React hooks?",
        "Explain closure in JavaScript",
        "Difference between var, let, const",
        "What is event delegation?",
        "Explain async/await",
        "What is hoisting?",
        "Explain virtual DOM",
        "What is REST API?"
    ];

    return base.slice(0, count);
};

module.exports = fallbackQuestions;