import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const contentHistorySchema = new mongoose.Schema(
  {
    username: {
      type: ObjectId,
      ref: "UserModel",
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContentHistoryModel =
  mongoose.models.ContentHistoryModel || mongoose.model("ContentHistoryModel", contentHistorySchema);
export default ContentHistoryModel;
