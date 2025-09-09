require("dotenv").config();
console.log("🔑 GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "Loaded ✅" : "Not Loaded ❌");

const  express=require ("express");
const cors = require("cors");
const path = require("path"); 
const connectDB = require("./config/db");

const authRoutes =require("./routes/authRoutes.js")
const sessionRoutes =require( "./routes/sessionRoutes.js");
const questionRoutes =require("./routes/questionRoutes.js");

const { protect } =require("./middlewares/authMiddleware.js");
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController");



const app = express();

// Middleware to handle CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);
app.post("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.post("/api/ai/generate-explanations", protect, generateConceptExplanation);



// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start Server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));