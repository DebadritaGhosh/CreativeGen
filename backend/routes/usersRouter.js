import express from "express";
import { register } from "../controllers/UsersController.js";

const usersRouter = express.Router();


usersRouter.post("/register",register);


export default usersRouter;