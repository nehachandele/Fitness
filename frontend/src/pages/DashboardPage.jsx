import { useEffect, useState } from "react";

import AppLayout from "../components/layout/AppLayout";

import WeeklyCaloriesChart from "../components/charts/WeeklyCaloriesChart";
import ActivityPieChart from "../components/charts/ActivityPieChart";

import GoalProgress from "../components/dashboard/GoalProgress";

import {
  generateWeeklyCalories,
  calculateGoalProgress,
} from "../utils/dashboardUtils";

import {
  FaRunning,
  FaFire,
  FaClock,
  FaBullseye,
} from "react-icons/fa";

import { getActivities } from "../services/activityService";

const DashboardPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await getActivities();
      setActivities(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const totalActivities = activities.length;

  const totalCalories = activities.reduce(
    (sum, activity) =>
      sum + (activity.caloriesBurned || 0),
    0
  );

  const avgDuration =
    activities.length > 0
      ? Math.round(
          activities.reduce(
            (sum, activity) =>
              sum + (activity.duration || 0),
            0
          ) / activities.length
        )
      : 0;

  const weeklyData =
    generateWeeklyCalories(activities);

  const goal =
    calculateGoalProgress(activities);

  const stats = [
    {
      title: "Activities",
      value: totalActivities,
      icon: <FaRunning />,
      color: "bg-violet-100",
    },
    {
      title: "Calories",
      value: totalCalories,
      icon: <FaFire />,
      color: "bg-pink-100",
    },
    {
      title: "Avg Duration",
      value: `${avgDuration}m`,
      icon: <FaClock />,
      color: "bg-blue-100",
    },
    {
      title: "Goal",
      value: `${goal.percentage}%`,
      icon: <FaBullseye />,
      color: "bg-green-100",
    },
  ];

  const activityTypes = {};

  activities.forEach((activity) => {
    activityTypes[activity.type] =
      (activityTypes[activity.type] || 0) + 1;
  });

  const pieData = Object.entries(
    activityTypes
  ).map(([key, value]) => ({
    name: key,
    value,
  }));

  const safePieData =
    pieData.length > 0
      ? pieData
      : [
          {
            name: "No Data",
            value: 1,
          },
        ];

  const recentActivities = [...activities]
    .sort(
      (a, b) =>
        new Date(b.startTime) -
        new Date(a.startTime)
    )
    .slice(0, 5);

  return (
    <AppLayout>
      <div className="space-y-8">

        {/* HEADER */}

        <div>
          <h1
            className="
            text-3xl
            font-bold
            text-[#23084D]
            "
          >
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Track your fitness progress
            and achievements.
          </p>
        </div>

        {/* LOADING */}

        {loading ? (
          <div
            className="
            bg-white
            rounded-3xl
            p-10
            text-center
            shadow-lg
            "
          >
            Loading Dashboard...
          </div>
        ) : (
          <>
            {/* STATS */}

            <div
              className="
              grid
              grid-cols-2
              lg:grid-cols-4
              gap-5
              "
            >
              {stats.map(
                (item, index) => (
                  <div
                    key={index}
                    className="
                    bg-white
                    rounded-3xl
                    p-5
                    shadow-lg
                    hover:shadow-xl
                    transition-all
                    duration-300
                    "
                  >
                    <div
                      className={`
                      w-12
                      h-12
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      text-xl
                      ${item.color}
                      `}
                    >
                      {item.icon}
                    </div>

                    <h3
                      className="
                      mt-4
                      text-gray-500
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                      text-3xl
                      font-bold
                      text-[#23084D]
                      "
                    >
                      {item.value}
                    </p>
                  </div>
                )
              )}
            </div>

            {/* CHARTS */}

            <div
              className="
              grid
              lg:grid-cols-2
              gap-6
              "
            >
              <WeeklyCaloriesChart
                data={weeklyData}
              />

              <ActivityPieChart
                data={safePieData}
              />
            </div>

            {/* GOAL */}

            <GoalProgress
              current={goal.current}
              goal={goal.goal}
              percentage={
                goal.percentage
              }
            />

            {/* RECENT ACTIVITIES */}

            <div
              className="
              bg-white
              rounded-3xl
              p-6
              shadow-lg
              "
            >
              <h2
                className="
                text-xl
                font-bold
                text-[#23084D]
                mb-5
                "
              >
                Recent Activities
              </h2>

              {recentActivities.length === 0 ? (
                <div
                  className="
                  text-center
                  py-8
                  text-gray-500
                  "
                >
                  No activities found.
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivities.map(
                    (activity) => (
                      <div
                        key={activity.id}
                        className="
                        flex
                        justify-between
                        items-center
                        border-b
                        pb-3
                        "
                      >
                        <div>
                          <h3
                            className="
                            font-semibold
                            text-[#23084D]
                            "
                          >
                            {activity.type}
                          </h3>

                          <p
                            className="
                            text-sm
                            text-gray-500
                            "
                          >
                            {activity.duration}
                            min
                          </p>
                        </div>

                        <div
                          className="
                          text-[#EC4899]
                          font-bold
                          "
                        >
                          {
                            activity.caloriesBurned
                          }
                          cal
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default DashboardPage;