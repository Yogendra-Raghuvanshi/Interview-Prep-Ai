const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // get token after "Bearer"

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };







// //{
//     "success": true,
//     "session": {
//         "user": "68acb9e9095d85a417c99958",
//         "role": "Frontend Developer",
//         "experience": "2 years",
//         "topicsToFocus": "React, JavaScript",
//         "description": "Preparing for frontend interview",
//         "questions": [
//             "68ad51751dd595477476e88d",
//             "68ad51751dd595477476e88e"
//         ],
//         "_id": "68ad51751dd595477476e88b",
//         "createdAt": "2025-08-26T06:17:25.519Z",
//         "updatedAt": "2025-08-26T06:17:26.104Z",
//         "__v": 1
//     }
// }