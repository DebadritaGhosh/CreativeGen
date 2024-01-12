import express from "express";
import usersRouter from "./routes/usersRouter.js";


const app = express();
const PORT = process.env.PORT || 8000;

app.use("/api/v1/users", usersRouter);

// Start the server
app.listen(PORT,console.log(`Server is running on port ${PORT} `))