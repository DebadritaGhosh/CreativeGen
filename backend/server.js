import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/usersRouter.js";
import connectDB from "./utils/connectDB.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1/users", usersRouter);

// ErrorHandler middlewares
app.use(errorHandler);

// Start the server
app.listen(PORT,console.log(`Server is running on port ${PORT} `))