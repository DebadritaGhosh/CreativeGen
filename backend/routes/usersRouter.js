import express from "express";
import { login, logout, register, userProfile } from "../controllers/UsersController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const usersRouter = express.Router();


usersRouter.post("/register",register);
usersRouter.post("/login",login);
usersRouter.post("/logout",logout);
usersRouter.get("/profile",isAuthenticated,userProfile);


export default usersRouter;