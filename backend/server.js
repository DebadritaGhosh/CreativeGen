import express from "express";
import dotenv from "dotenv";
import cron from "node-cron";
import usersRouter from "./routes/usersRouter.js";
import openAIRouter from "./routes/openAIRouter.js";
import connectDB from "./utils/connectDB.js";
import errorHandler from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import stripeRouter from "./routes/stripeRouter.js";
import UserModel from "./models/User.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// cron.schedule("0 0 * * * *", async () => {
//   try {
//     const today = new Date();

//     const updatedUser = await UserModel.updateMany(
//       {
//         trialActive: true,
//         trialExpires: { $lt: today },
//       },
//       {
//         trialExpires: true,
//         subscriptionPlan: "Free",
//         monthlyRequestCount: 5,
//       }
//     );
//   } catch (error) {
//     console.log("cron error => ", error);
//   }
// });

// // free plan
// cron.schedule("0 0 1 * * *", async () => {
//   try {
//     const today = new Date();

//     const updatedUser = await UserModel.updateMany(
//       {
//         subscriptionPlan: "Free",
//         nextBillingDate: { $lt: today },
//       },
//       {
//         monthlyRequestCount: 0,
//       }
//     );
//   } catch (error) {
//     console.log("cron error => ", error);
//   }
// });

// // Basic plan
// cron.schedule("0 0 1 * * *", async () => {
//   try {
//     const today = new Date();

//     const updatedUser = await UserModel.updateMany(
//       {
//         subscriptionPlan: "Basic",
//         nextBillingDate: { $lt: today },
//       },
//       {
//         monthlyRequestCount: 0,
//       }
//     );
//   } catch (error) {
//     console.log("cron error => ", error);
//   }
// });

// // Premium plan
// cron.schedule("0 0 1 * * *", async () => {
//   try {
//     const today = new Date();

//     const updatedUser = await UserModel.updateMany(
//       {
//         subscriptionPlan: "Premium",
//         nextBillingDate: { $lt: today },
//       },
//       {
//         monthlyRequestCount: 0,
//       }
//     );
//   } catch (error) {
//     console.log("cron error => ", error);
//   }
// });

// Middlewares
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin : "http://localhost:3000",
  credentials: true,
}
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/openai", openAIRouter);
app.use("/api/v1/stripe", stripeRouter);

// ErrorHandler middlewares
app.use(errorHandler);

// Start the server
app.listen(PORT, console.log(`Server is running on port ${PORT} `));
