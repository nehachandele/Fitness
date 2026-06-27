import api from "./api";
import { getUser, getToken, saveAuth } from "../utils/auth";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// Get logged-in user's profile
export const getProfile = async () => {
  const user = getUser();

  const response = await api.get(
    `/api/users/profile/${user.id}`,
    authHeader()
  );

  return response.data;
};

// Update profile
export const updateProfile = async (profileData) => {
  const user = getUser();

  const response = await api.put(
    `/api/users/profile/${user.id}`,
    profileData,
    authHeader()
  );

  // Update localStorage user
  const updatedUser = {
    ...user,
    ...response.data,
  };

  saveAuth({
    token: getToken(),
    user: updatedUser,
  });

  return response.data;
};