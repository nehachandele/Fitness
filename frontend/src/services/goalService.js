import api from "./api";
import { getUser } from "../utils/auth";

export const createGoal = async (
  goalData
) => {
  const response = await api.post(
    "/api/goals",
    goalData
  );

  return response.data;
};

export const getGoals = async () => {
  const user = getUser();

  const response = await api.get(
    `/api/goals/${user.id}`
  );

  return response.data;
};

export const updateGoalProgress =
  async (
    goalId,
    progress
  ) => {

    const response = await api.put(
      `/api/goals/${goalId}/${progress}`
    );

    return response.data;
  };