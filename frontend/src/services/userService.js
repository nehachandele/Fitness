import api from "./api";

export const getProfile = async (userId) => {
  const response = await api.get(`/api/users/profile/${userId}`);
  return response.data;
};

export const updateProfile = async (userId, profile) => {
  const response = await api.put(
    `/api/users/profile/${userId}`,
    profile
  );

  return response.data;
};