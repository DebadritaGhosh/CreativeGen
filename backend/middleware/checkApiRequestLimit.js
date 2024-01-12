import expressAsyncHandler from "express-async-handler";
import UserModel from "../models/User.js";

const checkApiRequestLimit = expressAsyncHandler(async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const user = await UserModel.findById(req?.user?.id);

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  let requestLimit = 0;

  if (user?.trialActive) {
    requestLimit = user?.monthlyRequestCount;
  }

  if (user?.apiRequestCount >= requestLimit) {
    throw new Error("API request limit reached");
  }

  next();
});

export default checkApiRequestLimit;
