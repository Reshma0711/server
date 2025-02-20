const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.signUp = async (req, res) => {
  // Check if the email already exists
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });

    console.log(hashedPassword);

    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const secretKey = process.env.JWT_SECRET_KEY;

exports.logIn = async (req, res) => {
  try {
    const { email, password, role} = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id:user.id,useremail: user.email, userrole: user.role },
      secretKey,
      { expiresIn: "1h" }
    );

    res.json({ token });
    console.log(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.accessPage = async (req, res) => {
  return res.json({ message: "Successfully you have routed to accespage." });
};

// const deniedPage=async (req,res)=>{
//     return res.json({message : "Sorry you don't have access to this page because token verification failed."})
// }

// module.exports = { signUp, accessPage };



