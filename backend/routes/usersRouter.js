import express from "express";
import { checkAuth, login, logout, register, userProfile } from "../controllers/UsersController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const usersRouter = express.Router();


usersRouter.post("/register",register);
usersRouter.post("/login",login);
usersRouter.post("/logout",logout);
usersRouter.get("/profile",isAuthenticated,userProfile);
usersRouter.get("/auth/check",isAuthenticated,checkAuth);


export default usersRouter;