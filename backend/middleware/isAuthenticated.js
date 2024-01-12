import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const isAuthenticated = expressAsyncHandler(async(req,res,next) => {
    if(req.cookies.token){
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        // console.log("DECODED",decoded);
        req.user = await UserModel.findById(decoded?.id).select('-password');
        return next();
    }else{
        return res.status(401).json({message : "Not authorized, no token"});
    }
});

export default isAuthenticated;