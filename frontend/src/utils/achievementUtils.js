export const getAchievements = (
  activities
) => {

  const achievements = [];

  const totalActivities =
    activities.length;

  const totalCalories =
    activities.reduce(
      (sum, activity) =>
        sum +
        (activity.caloriesBurned || 0),
      0
    );

  if (totalActivities >= 1)
    achievements.push(
      "🔥 First Workout"
    );

  if (totalActivities >= 5)
    achievements.push(
      "🏃 Active Starter"
    );

  if (totalActivities >= 10)
    achievements.push(
      "🏅 Fitness Explorer"
    );

  if (totalActivities >= 25)
    achievements.push(
      "🚀 Fitness Champion"
    );

  if (totalCalories >= 1000)
    achievements.push(
      "⚡ 1000 Calories Burned"
    );

  if (totalCalories >= 5000)
    achievements.push(
      "🔥 5000 Calories Burned"
    );

  return achievements;
};