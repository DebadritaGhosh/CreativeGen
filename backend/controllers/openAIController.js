import expressAsyncHandler from "express-async-handler";
import axios from "axios";
import ContentHistoryModel from "../models/ContentHistory.js";
import UserModel from "../models/User.js";

export const openAIController = expressAsyncHandler(async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    res.status(400);
    throw new Error("Please give a blog topic");
  }
  try {
    // const response = await axios.post(
    //   "https://api.openai.com/v1/completions",
    //   {
    //     model: "gpt-3.5-turbo-instruct",
    //     prompt: `generate a blog post on ${prompt}`,
    //     max_tokens: 10,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // console.log(response.data);
    const blogText = "JavaScript: The dynamic language powering interactive web experiences and driving modern web development. Explore its versatility in just 150 characters!";
    
      const newContent = await ContentHistoryModel.create({
        user: req?.user?._id,
        content: blogText
      });


      const userFound = await UserModel.findById(req?.user?._id);
      await userFound.history.push(newContent?._id);
      userFound.apiRequestCount += 1;
      await userFound.save();

      res.status(200).json({
        status: "success",
        data: blogText,
      });

  } catch (error) {
    throw new Error(error);
  }
});
