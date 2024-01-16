import axios from "axios";
const BASE_URL = "http://localhost:8000/api/v1";

// Login
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
