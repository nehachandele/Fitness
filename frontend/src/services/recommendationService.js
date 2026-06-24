import api from "./api";

export const generateRecommendation = async (
  recommendationData
) => {
  const response = await api.post(
    "/api/recommendation/generate",
    recommendationData
  );

  return response.data;
};

export const getUserRecommendations =
  async (userId) => {
    const response = await api.get(
      `/api/recommendation/user/${userId}`
    );

    return response.data;
  };