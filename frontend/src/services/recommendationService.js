import axios from "axios";

const API =
  "http://localhost:8080/api/recommendation";

export const getUserRecommendations =
  async (userId) => {

    const response =
      await axios.get(
        `${API}/user/${userId}`
      );

    return response.data;
  };

export const generateRecommendation =
  async (payload) => {

    const response =
      await axios.post(
        `${API}/generate`,
        payload
      );

    return response.data;
  };