import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const paymentSchema = new mongoose.Schema(
  {
    username: {
      type: ObjectId,
      ref: "UserModel",
    },
    reference: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
    subscriptionPlan: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    apiRequestCount: {
      type: Number,
      default: 0,
    },
    monthlyRequestCount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentModel =
  mongoose.models.PaymentModel || mongoose.model("PaymentModel", paymentSchema);
export default PaymentModel;
