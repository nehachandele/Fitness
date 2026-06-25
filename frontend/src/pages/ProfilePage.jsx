import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  FaEnvelope,
  FaFire,
  FaRunning,
  FaTrophy,
  FaCalendarAlt,
} from "react-icons/fa";

import AppLayout from "../components/layout/AppLayout";
import { getUser } from "../utils/auth";

import { getActivities } from "../services/activityService";

import {
  getAchievements,
} from "../utils/achievementUtils";

import {
  calculateFitnessScore,
} from "../utils/dashboardUtils";

const ProfilePage = () => {

  const user = getUser();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {

    try {

      const data =
        await getActivities();

      setActivities(data || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  const totalActivities =
    activities.length;

  const totalCalories =
    activities.reduce(
      (sum, activity) =>
        sum +
        (activity.caloriesBurned || 0),
      0
    );

  const badges =
    getAchievements(
      activities
    );

  const fitnessScore =
    calculateFitnessScore(
      activities
    );

  const stats = [
    {
      title: "Activities",
      value: totalActivities,
      icon: <FaRunning />,
      bg: "bg-violet-50",
      color: "text-violet-600",
    },
    {
      title: "Calories Burned",
      value: totalCalories,
      icon: <FaFire />,
      bg: "bg-pink-50",
      color: "text-pink-500",
    },
    {
      title: "Achievements",
      value: badges.length,
      icon: <FaTrophy />,
      bg: "bg-indigo-50",
      color: "text-indigo-500",
    },
  ];

  return (
    <AppLayout>

      <div className="space-y-8">

        {/* PROFILE HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
          bg-gradient-to-r
          from-[#23084D]
          via-[#4C1D95]
          to-[#7C3AED]
          rounded-3xl
          p-8
          text-white
          shadow-xl
          "
        >
          <div
            className="
            flex
            flex-col
            md:flex-row
            items-center
            gap-6
            "
          >

            <div
              className="
              w-28
              h-28
              rounded-full
              bg-white/20
              backdrop-blur
              flex
              items-center
              justify-center
              text-5xl
              font-bold
              shadow-lg
              "
            >
              {user?.firstName?.charAt(0)}
            </div>

            <div>

              <h1
                className="
                text-3xl
                font-bold
                "
              >
                {user?.firstName} {user?.lastName}
              </h1>

              <p className="text-violet-100 mt-2">
                Fitness Enthusiast
              </p>

              <div
                className="
                flex
                flex-wrap
                gap-4
                mt-4
                "
              >

                <span
                  className="
                  flex
                  items-center
                  gap-2
                  "
                >
                  <FaEnvelope />
                  {user?.email}
                </span>

                <span
                  className="
                  flex
                  items-center
                  gap-2
                  "
                >
                  <FaCalendarAlt />

                  {user?.createdAt
                    ? new Date(
                        user.createdAt
                      ).toLocaleDateString()
                    : "Member"}
                </span>

              </div>

            </div>

          </div>

        </motion.div>

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
            Loading Profile...
          </div>

        ) : (

          <>

            {/* STATS */}

            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-5
              "
            >

              {stats.map(
                (item, index) => (

                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.03,
                    }}
                    className={`
                    ${item.bg}
                    rounded-3xl
                    p-6
                    shadow-lg
                    `}
                  >

                    <div
                      className={`
                      text-4xl
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
                      mt-2
                      text-[#23084D]
                      "
                    >
                      {item.value}
                    </p>

                  </motion.div>

                )
              )}

            </div>

            {/* FITNESS SCORE */}

            <motion.div
              whileHover={{
                scale: 1.01,
              }}
              className="
              bg-white
              rounded-3xl
              p-8
              shadow-lg
              "
            >

              <h2
                className="
                text-2xl
                font-bold
                text-[#23084D]
                "
              >
                Fitness Score
              </h2>

              <div
                className="
                flex
                flex-col
                items-center
                mt-8
                "
              >

                <div
                  className="
                  w-40
                  h-40
                  rounded-full
                  bg-gradient-to-r
                  from-[#23084D]
                  via-[#7C3AED]
                  to-[#EC4899]
                  flex
                  items-center
                  justify-center
                  text-white
                  text-5xl
                  font-bold
                  shadow-xl
                  "
                >
                  {fitnessScore}
                </div>

                <p
                  className="
                  mt-5
                  text-gray-500
                  "
                >
                  {fitnessScore >= 80
                    ? "Excellent Progress 🔥"
                    : fitnessScore >= 50
                    ? "Good Progress 💪"
                    : "Keep Going 🚀"}
                </p>

              </div>

            </motion.div>

            {/* ACHIEVEMENTS */}

            <motion.div
              whileHover={{
                scale: 1.01,
              }}
              className="
              bg-white
              rounded-3xl
              p-8
              shadow-lg
              "
            >

              <h2
                className="
                text-2xl
                font-bold
                text-[#23084D]
                mb-6
                "
              >
                Achievements
              </h2>

              <div
                className="
                grid
                md:grid-cols-2
                gap-4
                "
              >

                {badges.length > 0 ? (

                  badges.map(
                    (
                      badge,
                      index
                    ) => (

                      <div
                        key={index}
                        className="
                        bg-violet-50
                        border
                        border-violet-100
                        rounded-2xl
                        p-4
                        font-medium
                        "
                      >
                        {badge}
                      </div>

                    )
                  )

                ) : (

                  <div
                    className="
                    col-span-2
                    text-center
                    py-6
                    text-gray-500
                    "
                  >
                    Complete activities
                    to unlock
                    achievements.
                  </div>

                )}

              </div>

              {/* NEXT GOAL */}

              <div
                className="
                mt-8
                bg-gradient-to-r
                from-[#23084D]
                via-[#4C1D95]
                to-[#7C3AED]
                rounded-3xl
                p-6
                text-white
                "
              >

                <h3
                  className="
                  text-xl
                  font-bold
                  "
                >
                  Next Goal
                </h3>

                <p
                  className="
                  mt-2
                  text-violet-100
                  "
                >
                  Complete 10 activities
                  to unlock Fitness
                  Explorer Badge.
                </p>

              </div>

            </motion.div>

            {/* ACCOUNT INFO */}

            <motion.div
              whileHover={{
                scale: 1.01,
              }}
              className="
              bg-white
              rounded-3xl
              p-8
              shadow-lg
              "
            >

              <h2
                className="
                text-2xl
                font-bold
                text-[#23084D]
                mb-6
                "
              >
                Account Information
              </h2>

              <div className="space-y-4">

                <div
                  className="
                  flex
                  justify-between
                  border-b
                  pb-3
                  "
                >
                  <span>Name</span>

                  <span className="font-semibold">
                    {user?.firstName}
                    {" "}
                    {user?.lastName}
                  </span>
                </div>

                <div
                  className="
                  flex
                  justify-between
                  border-b
                  pb-3
                  "
                >
                  <span>Email</span>

                  <span className="font-semibold">
                    {user?.email}
                  </span>
                </div>

                <div
                  className="
                  flex
                  justify-between
                  "
                >
                  <span>Role</span>

                  <span className="font-semibold">
                    USER
                  </span>
                </div>

              </div>

            </motion.div>

          </>

        )}

      </div>

    </AppLayout>
  );
};

export default ProfilePage;