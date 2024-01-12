import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";

// Registration
export const register = async (req,res) => {
    try {
        const {username,email,password} = req.body;

        if(!username || !email || !password){
            res.status(400)
            throw new Error("All fields are required");
        }

        
        const userExists = await UserModel.findOne({email});

        if(userExists){
            res.status(400);
            throw new Error("User already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new UserModel({
            username,
            password : hashedPassword,
            email
        });

        newUser.trialExpires = new Date(new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000);

        await newUser.save();


        res.json({
            status: true,
            message: "Registration was successfull",
            user: {
                username,
                email
            }
        });        
    } catch (error) {
        throw new Error(error);
    }

}
// Login

// Logout

// Profile

// Check user auth status