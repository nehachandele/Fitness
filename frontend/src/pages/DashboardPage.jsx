import { motion } from "framer-motion";
import {
  FaRunning,
  FaFire,
  FaBullseye,
  FaChartLine,
  FaRobot,
} from "react-icons/fa";

import { getUser } from "../utils/auth";
import AppLayout from "../components/layout/AppLayout";

const DashboardPage = () => {
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
      title: "Goals",
      value: "85%",
      icon: <FaBullseye />,
      bg: "bg-green-50",
      color: "text-green-500",
    },
    {
      title: "Progress",
      value: "+18%",
      icon: <FaChartLine />,
      bg: "bg-violet-50",
      color: "text-[#23084D]",
    },
  ];

  return (
    <AppLayout>
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-white
      via-[#F8F5FF]
      to-[#EDE9FE]
      p-4
      md:p-6
      "
    >
      {/* Hero Card */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="
        bg-gradient-to-r
        from-[#23084D]
        to-[#3B1175]
        rounded-3xl
        p-6
        md:p-10
        text-white
        shadow-xl
        "
      >
        <h2 className="text-3xl font-bold">
          Welcome Back 👋
        </h2>

        <p className="mt-2 text-violet-100">
          {user?.firstName} {user?.lastName}
        </p>

        <div className="mt-8">
          <p className="text-violet-200">
            Daily Goal
          </p>

          <div
            className="
            mt-3
            bg-white/20
            rounded-full
            h-4
            overflow-hidden
            "
          >
            <div
              className="
              h-full
              w-[70%]
              bg-green-400
              rounded-full
              "
            />
          </div>

          <p className="mt-2">
            70% Completed
          </p>
        </div>
      </motion.div>

      {/* Stats */}

      <div
        className="
        grid
        grid-cols-2
        lg:grid-cols-4
        gap-4
        mt-6
        "
      >
        {stats.map((item, index) => (
          <motion.div
            whileHover={{
              scale: 1.04,
            }}
            key={index}
            className={`
            ${item.bg}
            p-5
            rounded-3xl
            shadow-lg
            border
            border-white
            `}
          >
            <div
              className={`
              text-3xl
              ${item.color}
              `}
            >
              {item.icon}
            </div>

            <h3 className="mt-4 text-gray-500">
              {item.title}
            </h3>

            <p
              className="
              text-2xl
              font-bold
              mt-1
              "
            >
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Activity Card */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
        mt-8
        bg-white
        rounded-3xl
        p-6
        shadow-lg
        "
      >
        <h3
          className="
          text-xl
          font-bold
          text-[#23084D]
          "
        >
          Today's Activity
        </h3>

        <div className="mt-6 space-y-4">
          <div
            className="
            bg-blue-50
            p-4
            rounded-2xl
            flex
            justify-between
            "
          >
            <div>
              <h4 className="font-semibold">
                Running
              </h4>

              <p className="text-sm text-gray-500">
                45 Minutes
              </p>
            </div>

            <span
              className="
              text-blue-500
              font-bold
              "
            >
              320 cal
            </span>
          </div>

          <div
            className="
            bg-green-50
            p-4
            rounded-2xl
            flex
            justify-between
            "
          >
            <div>
              <h4 className="font-semibold">
                Walking
              </h4>

              <p className="text-sm text-gray-500">
                20 Minutes
              </p>
            </div>

            <span
              className="
              text-green-500
              font-bold
              "
            >
              110 cal
            </span>
          </div>
        </div>
      </motion.div>

      {/* AI Coach */}

      <motion.div
        whileHover={{
          scale: 1.01,
        }}
        className="
        mt-8
        bg-gradient-to-r
        from-violet-100
        to-pink-100
        rounded-3xl
        p-6
        shadow-lg
        "
      >
        <div className="flex items-center gap-3">
          <FaRobot
            className="
            text-3xl
            text-[#23084D]
            "
          />

          <h3
            className="
            text-xl
            font-bold
            text-[#23084D]
            "
          >
            AI Fitness Coach
          </h3>
        </div>

        <p className="mt-4 text-gray-700">
          Great consistency this week.
          Increase your running duration
          by 10 minutes to improve stamina.
        </p>

        <button
          className="
          mt-5
          bg-[#23084D]
          text-white
          px-5
          py-3
          rounded-xl
          "
        >
          View Recommendations
        </button>
      </motion.div>
    </div>
    </AppLayout>
  );
};

export default DashboardPage;