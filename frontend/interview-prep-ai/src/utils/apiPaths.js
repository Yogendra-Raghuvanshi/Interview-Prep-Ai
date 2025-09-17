// 🌍 Backend Base URL
// Local testing -> http://localhost:5000
// Production (Render) -> use your deployed link
export const BASE_URL = "https://interview-prep-ai-5-rewn.onrender.com";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image",
  },
  AI: {
    GENERATE_QUESTIONS: "/api/ai/generate-questions",
    GENERATE_EXPLANATION: "/api/ai/generate-explanations",
  },
  SESSION: {
    CREATE: "/api/sessions/create",
    GET_ALL: "/api/sessions/my-sessions",
    GET_ONE: (id) => `/api/sessions/${id}`,   // function ✅
    DELETE: (id) => `/api/sessions/${id}`,    // function ✅
  },
  QUESTION: {
    ADD_TO_SESSION: "/api/questions/add",
    PIN: (id) => `/api/questions/${id}/pin`,           // function ✅
    UPDATE_NOTE: (id) => `/api/questions/${id}/note`,  // function ✅
  },
};
