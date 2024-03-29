import axios from "axios";
const BASE_URL = "http://localhost:8000/api/v1";

// Registration
export const registerAPI = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/users/register`,
    {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// Login
export const loginAPI = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/users/login`,
    {
      email: userData.email,
      password: userData.password,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// Logout
export const logoutAPI = async () => {
  const response = await axios.post(
    `${BASE_URL}/users/logout`,{},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// check auth
export const checkUserAuthStatusAPI = async () => {
  const response = await axios.get(
    `${BASE_URL}/users/auth/check`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// fetch profile
export const getUserProfileAPI = async () => {
  const response = await axios.get(
    `${BASE_URL}/users/profile`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
