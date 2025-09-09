import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Home/Dashboard";
import InterViewPrep from "./pages/InterviewPrep/InterViewPrep";
import Login from "./pages/Auth/Login";      // ✅ make sure path is correct
import Signup from "./pages/Auth/Signup";  // ✅ make sure path is correct
import UserProvider from "./context/userContext";

const App = () => {
  return (
    <UserProvider>
    <div>
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview-prep/:sessionId" element={<InterViewPrep />} />
      </Routes>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </Router>
    </div>
    </UserProvider>
  );
};

export default App;
