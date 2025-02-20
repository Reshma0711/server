const secretKey = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization");
  console.log("Token...", token);
  if (!token) return res.status(401).json({ message: "Access denied" });
  try {
    const decoded = jwt.verify(token.split(" ")[1], secretKey);
    req.user = decoded;
    console.log("user.....", req.user);

    console.log("Verification has done successfully");
    return next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


module.exports={verifyToken}

