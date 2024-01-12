import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/usersRouter.js";
import openAIRouter from "./routes/openAIRouter.js";
import connectDB from "./utils/connectDB.js";
import errorHandler from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import stripeRouter from "./routes/stripeRouter.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/openai", openAIRouter);
app.use("/api/v1/stripe", stripeRouter);

// ErrorHandler middlewares
app.use(errorHandler);

// Start the server
app.listen(PORT,console.log(`Server is running on port ${PORT} `))