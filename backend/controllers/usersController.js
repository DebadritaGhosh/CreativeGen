import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

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

  const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({
    status: "success",
    _id: user?._id,
    message: "Login success",
    username: user.username,
    email: user.email,
  });
});

// Logout
export const logout = expressAsyncHandler(async (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.status(200).json({ message: "Logged out successfullt" });
});

// Profile
export const userProfile = expressAsyncHandler(async (req, res) => {
  const user = await UserModel.findById(req?.user?._id)
    .select("-password")
    .populate("payments")
    .populate("history");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({
    status: "success",
    user,
  });
});

// Check user auth status

export const checkAuth = expressAsyncHandler(async (req, res) => {
  const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
  if (decoded) {
    res.json({
      isAuthenticated: true,
    });
  } else {
    res.json({
      isAuthenticated: false,
    });
  }
});
