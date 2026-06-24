import api from "./api";
import { getUser } from "../utils/auth";

export const getActivities = async () => {
  const user = getUser();

  const response = await api.get("/api/activities", {
    headers: {
      "X-User-ID": user.id,
    },
  });

  return response.data;
};

export const createActivity = async (
  activityData
) => {
  const response = await api.post(
    "/api/activities",
    activityData
  );

  return response.data;
};