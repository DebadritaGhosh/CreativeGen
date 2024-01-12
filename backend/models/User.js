import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    trialPeriod: {
      type: Number,
      default: 3
    },
    trialActive: {
      type: Boolean,
      default: true,
    },
    trialExpires: {
      type: Date,
    },
    subscriptionPlan: {
      type: String,
      enum: ["Trial", "Free", "Basic", "Premium"],
    },
    apiRequestCount: {
      type: Number,
      default: 0,
    },
    monthlyRequestCount: {
      type: Number,
      default: 100,
    },
    nextBillingDate: Date,
    payments: [
      {
        type: ObjectId,
        ref: "PaymentModel",
      },
    ],
    history: [
      {
        type: ObjectId,
        ref: "ContentHistoryModel",
      },
    ],
  },
  {
    timestamps: true,
    toJSON:{virtuals: true},
    toObject: {virtuals: true},
  }
);

// userSchema.virtual("isTrialActive").get(function(){
//   return this.trialActive && new Date() < this.trialExpires
// })

const UserModel = mongoose.models.UserModel || mongoose.model("UserModel",userSchema);
export default UserModel;
