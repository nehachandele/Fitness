import api from "./api";

export const registerUser = async (userData) => {
  const response = await api.post(
    "/api/users/register",
    userData
  );

  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post(
    "/api/users/login",
    data
  );

  return response.data;
};