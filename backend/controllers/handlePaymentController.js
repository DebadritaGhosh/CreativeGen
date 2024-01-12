import expressAsyncHandler from "express-async-handler";
import UserModel from "../models/User.js";
import Stripe from "stripe";
import calculateNextBillingDate from "../utils/calculateNextBillingDate.js";
import shouldRenewSubscriptionPlan from "../utils/shouldRenewSubscriptionPlan.js";
import PaymentModel from "../models/Payment.js";

export const handlePayment = expressAsyncHandler(async (req, res) => {
  const { amount, subscriptionPlan } = req.body;
  const user = req.user;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "usd",
      metadata: {
        userId: user._id.toString(),
        userEmail: user.email,
        subscriptionPlan,
      },
    });

    res.json({
      clientSecret: paymentIntent?.client_secret,
      paymentId: paymentIntent?.id,
      metadata: paymentIntent?.metadata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

export const handleFreePayment = expressAsyncHandler(async (req, res) => {
  try {
    const user = req.user;

    console.log(
      "shouldRenewSubscriptionPlan",
      shouldRenewSubscriptionPlan(user)
    );

    if (shouldRenewSubscriptionPlan(user)) {
      (user.subscriptionPlan = "Free"),
        (user.monthlyRequestCount = 5),
        (user.apiRequestCount = 0);
      user.nextBillingDate = calculateNextBillingDate();
      const newPayment = await PaymentModel.create({
        user: user?._id,
        subscriptionPlan: "Free",
        amount: 0,
        status: "success",
        reference: Math.random().toString(36).substring(7),
        monthlyRequestCount: 5,
        currency: "usd",
      });

      user.payments.push(newPayment?._id);

      await user.save();

      res.json({
        status: "success",
        message: "Subscription plan updated successfully",
        user,
      });
    } else {
      return res
        .status(403)
        .json({ error: "Subscription renewal not due yet" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

export const verifyPayment = expressAsyncHandler(async (req, res) => {
  try {
    const { paymentId } = req.params;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

    console.log(paymentIntent);

    if (paymentIntent.status === "succeeded") {
      const metadata = paymentIntent?.metadata;
      const subscriptionPlan = metadata?.subscriptionPlan;
      const userEmail = metadata?.userEmail;
      const userId = metadata?.userId;

      const userFound = await UserModel.findById(userId);

      if (!userFound) {
        return res.status(404).json({
          status: "false",
          message: "User not found",
        });
      }

      const amount = paymentIntent?.amount / 100;
      const currency = paymentIntent?.currency;
      const paymentId = paymentIntent?.id;

      const newPayment = await PaymentModel.create({
        user: userId,
        email: userEmail,
        subscriptionPlan: subscriptionPlan,
        amount: amount,
        currency: currency,
        status: "success",
        reference: paymentId,
      });

      if(subscriptionPlan === "Basic"){
            const updatedUser = await UserModel.findByIdAndUpdate(userId,{
            subscriptionPlan,
            trialPeriod: 0,
            nextBillingDate: calculateNextBillingDate(),
            apiRequestCount: 0,
            monthlyRequestCount: 50,
            subscriptionPlan: "Basic",
            $addToSet: {payments: newPayment?._id}
            });

            res.status(200).json({
            status : true,
            message: "Payment verified,user updated",
            updatedUser
            });
      }

      if(subscriptionPlan === "Premium"){
        const updatedUser = await UserModel.findByIdAndUpdate(userId,{
        subscriptionPlan,
        trialPeriod: 0,
        nextBillingDate: calculateNextBillingDate(),
        apiRequestCount: 0,
        monthlyRequestCount: 100,
        subscriptionPlan: "Premium",
        $addToSet: {payments: newPayment?._id}
        });

        res.status(200).json({
        status : true,
        message: "Payment verified,user updated",
        updatedUser
        });
  }

    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});
