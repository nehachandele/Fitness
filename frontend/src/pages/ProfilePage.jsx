import { motion } from "framer-motion";

import {
  FaUser,
  FaEnvelope,
  FaFire,
  FaRunning,
  FaTrophy,
  FaCalendarAlt,
} from "react-icons/fa";

import AppLayout from "../components/layout/AppLayout";
import { getUser } from "../utils/auth";

const ProfilePage = () => {
  const user = getUser();

  const stats = [
    {
      title: "Activities",
      value: "12",
      icon: <FaRunning />,
      bg: "bg-blue-50",
      color: "text-blue-500",
    },
    {
      title: "Calories",
      value: "2450",
      icon: <FaFire />,
      bg: "bg-orange-50",
      color: "text-orange-500",
    },
    {
      title: "Achievements",
      value: "5",
      icon: <FaTrophy />,
      bg: "bg-green-50",
      color: "text-green-500",
    },
  ];

  const badges = [
    "🔥 First Workout",
    "🏃 Running Starter",
    "⚡ 1000 Calories Burned",
    "🎯 Goal Achiever",
  ];

  return (
    <AppLayout>
      <div className="space-y-8">

        {/* Profile Header */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
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
              text-4xl
              font-bold
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
                <span className="flex items-center gap-2">
                  <FaEnvelope />
                  {user?.email}
                </span>

                <span className="flex items-center gap-2">
                  <FaCalendarAlt />
                  Member
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-5
          "
        >
          {stats.map((item, index) => (
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
                mt-1
                "
              >
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Fitness Score */}

        <motion.div
          whileHover={{ scale: 1.01 }}
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
              to-[#8B5CF6]
              flex
              items-center
              justify-center
              text-white
              text-4xl
              font-bold
              "
            >
              87
            </div>

            <p className="mt-4 text-gray-500">
              Excellent Progress
            </p>
          </div>
        </motion.div>

        {/* Achievements */}

        <motion.div
          whileHover={{ scale: 1.01 }}
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
            {badges.map(
              (badge, index) => (
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
            )}
          </div>
        </motion.div>

        {/* Account Info */}

        <motion.div
          whileHover={{ scale: 1.01 }}
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
                {user?.firstName} {user?.lastName}
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

      </div>
    </AppLayout>
  );
};

export default ProfilePage;