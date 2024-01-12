import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import UserModel from "../models/User.js";

// Registration
export const register = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    username,
    password: hashedPassword,
    email,
  });

  newUser.trialExpires = new Date(
    new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000
  );

  await newUser.save();

  res.json({
    status: true,
    message: "Registration was successfull",
    user: {
      username,
      email,
    },
  });
});



// Login
export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isMatched = await bcrypt.compare(password, user?.password);

  if (!isMatched) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    status: "success",
    _id: user?._id,
    message: "Login success",
    username: user.username,
    email: user.email,
  });
});

// Logout

// Profile

// Check user auth status
