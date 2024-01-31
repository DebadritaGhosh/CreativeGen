import axios from "axios";
const BASE_URL = "http://localhost:8000/api/v1";

// Free subscription
export const handleFreeSubscriptionAPI = async (userPrompt ) => {
  const response = await axios.post(
    `${BASE_URL}/stripe/free-plan`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// Stripe payment
export const createStripePaymentIntent = async (payment ) => {
  const response = await axios.post(
    `${BASE_URL}/stripe/checkout`,
    {
        amount: Number(payment?.amount),
        subscriptionPlan : payment?.plan
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// Stripe payment
export const stripePaymentSuccessAPI = async (id ) => {
  const response = await axios.post(
    `${BASE_URL}/stripe/varify-payment/${id}`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};
