export const generateWeeklyCalories = (activities) => {

  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const result = days.map((day) => ({
    day,
    calories: 0,
  }));

  activities.forEach((activity) => {

    if (!activity.startTime) return;

    const date = new Date(
      activity.startTime
    );

    const dayIndex =
      date.getDay();

    result[dayIndex].calories +=
      activity.caloriesBurned || 0;
  });

  return result;
};

export const calculateFitnessScore = (
  activities
) => {

  const totalActivities =
    activities.length;

  const totalCalories =
    activities.reduce(
      (sum, activity) =>
        sum +
        (activity.caloriesBurned || 0),
      0
    );

  return Math.min(
    100,
    Math.round(
      totalActivities * 3 +
      totalCalories / 100
    )
  );
};

export const calculateGoalProgress = (
  activities
) => {

  const WEEKLY_GOAL = 3000;

  const totalCalories =
    activities.reduce(
      (sum, activity) =>
        sum +
        (activity.caloriesBurned || 0),
      0
    );

  return {
    current: totalCalories,
    goal: WEEKLY_GOAL,
    percentage: Math.min(
      100,
      Math.round(
        (totalCalories /
          WEEKLY_GOAL) *
          100
      )
    ),
  };
};