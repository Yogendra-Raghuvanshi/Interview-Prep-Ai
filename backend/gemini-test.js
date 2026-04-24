// require("dotenv").config();
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// async function checkGemini() {
//   try {
//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.0-flash"
//     });

//     const result = await model.generateContent("Hello Gemini");

//     console.log("Gemini connected successfully");
//     console.log(result.response.text());

//   } catch (error) {
//     console.log("Gemini connection failed");
//     console.error(error);
//   }
// }

// checkGemini();require("dotenv").config();
require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function testGemini() {
  try {

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Hello Gemini"
    });

    console.log("Gemini connected successfully");
    console.log(response.text);

  } catch (error) {

    console.log("Gemini connection failed");
    console.error(error);

  }
}

testGemini();