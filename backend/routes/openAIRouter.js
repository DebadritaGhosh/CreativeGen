import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { openAIController } from "../controllers/openAIController.js";
import checkApiRequestLimit from "../middleware/checkApiRequestLimit.js";

const openAIRouter = express.Router();


openAIRouter.post("/generate",isAuthenticated,checkApiRequestLimit,openAIController);


export default openAIRouter;
