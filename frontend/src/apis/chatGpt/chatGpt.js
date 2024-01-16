import axios from "axios";
const BASE_URL = "http://localhost:8000/api/v1";

// Login
export const generateContentAPI = async (userPrompt ) => {
  const response = await axios.post(
    `${BASE_URL}/openai/generate`,
    {
      prompt: `write a blog about ${userPrompt.prompt} the tone should be ${userPrompt.tone} and it is related to ${userPrompt.category}`,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};
