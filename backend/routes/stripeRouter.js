import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {handleFreePayment, handlePayment, verifyPayment} from "../controllers/handlePaymentController.js";

const stripeRouter = express.Router();


stripeRouter.post("/checkout",isAuthenticated,handlePayment);
stripeRouter.post("/free-plan",isAuthenticated,handleFreePayment);
stripeRouter.post("/varify-payment/:paymentId",isAuthenticated,verifyPayment);

export default stripeRouter;