import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./AuthContext/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

//Strip config
const stripePromise = loadStripe(
  "pk_test_51OXpLoSD4sdcFKUGcbn9TeKE6GqToQh58DhrkGnPFTfvxCIAO0ik2hBDTZ2qYX38fCRyC6nX0gzd2PIKV6gE9QoE00KAMxh9HZ"
);

// const customer = await stripe.customers.create({
//   name: 'Jenny Rosen',
//   address: {
//     line1: '510 Townsend St',
//     postal_code: '98140',
//     city: 'San Francisco',
//     state: 'CA',
//     country: 'US',
//   },
// });


const options = {
  mode: "payment",
  currency: "usd",
  amount : 1099,
  description: 'One-time setup fee',
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Elements stripe={stripePromise} options={options}>
          <App />
        </Elements>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
