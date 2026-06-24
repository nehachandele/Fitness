import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaRunning,
  FaWalking,
  FaBicycle,
  FaSwimmer,
  FaDumbbell,
} from "react-icons/fa";

import { toast } from "react-toastify";

import {
  createActivity,
  getActivities,
} from "../services/activityService";

import { getUser } from "../utils/auth";
import AppLayout from "../components/layout/AppLayout";

const ActivitiesPage = () => {
  const user = getUser();

  const [loading, setLoading] =
    useState(false);

  const [activities, setActivities] =
    useState([]);

  const [formData, setFormData] =
    useState({
      type: "RUNNING",
      duration: "",
      caloriesBurned: "",
    });

  const fetchActivities =
    async () => {
      try {
        const data =
          await getActivities();

        setActivities(data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.duration) {
      toast.error(
        "Duration is required"
      );
      return;
    }

    if (
      !formData.caloriesBurned
    ) {
      toast.error(
        "Calories are required"
      );
      return;
    }

    try {
      setLoading(true);

      const payload = {
        userId: user.id,
        type: formData.type,
        duration:
          Number(
            formData.duration
          ),
        caloriesBurned:
          Number(
            formData.caloriesBurned
          ),
        startTime:
          new Date().toISOString(),
      };

      await createActivity(
        payload
      );

      toast.success(
        "Activity Added",
        {
          style: {
            background:
              "#23084D",
            color: "#fff",
          },
        }
      );

      setFormData({
        type: "RUNNING",
        duration: "",
        caloriesBurned: "",
      });

      fetchActivities();
    } catch (error) {
      toast.error(
        "Failed To Add Activity"
      );
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "RUNNING":
        return (
          <FaRunning />
        );

      case "WALKING":
        return (
          <FaWalking />
        );

      case "CYCLING":
        return (
          <FaBicycle />
        );

      case "SWIMMING":
        return (
          <FaSwimmer />
        );

      default:
        return (
          <FaDumbbell />
        );
    }
  };

  return (
    <AppLayout>
    <div
      className="
      min-h-screen
      p-4
      md:p-6
      bg-gradient-to-br
      from-white
      via-[#F8F5FF]
      to-[#EDE9FE]
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
        max-w-6xl
        mx-auto
        "
      >
        <h1
          className="
          text-3xl
          md:text-4xl
          font-bold
          text-[#23084D]
          "
        >
          Activity Tracker
        </h1>

        <p className="text-gray-500 mt-2">
          Track your workouts and
          fitness progress.
        </p>

        {/* FORM */}

        <motion.div
          whileHover={{
            scale: 1.01,
          }}
          className="
          mt-8
          bg-white
          p-6
          rounded-3xl
          shadow-lg
          "
        >
          <h2
            className="
            text-xl
            font-semibold
            text-[#23084D]
            "
          >
            Add Activity
          </h2>

          <form
            onSubmit={
              handleSubmit
            }
            className="
            mt-6
            grid
            md:grid-cols-3
            gap-4
            "
          >
            <select
              name="type"
              value={
                formData.type
              }
              onChange={
                handleChange
              }
              className="
              p-3
              rounded-xl
              border
              border-violet-200
              "
            >
              <option>
                RUNNING
              </option>

              <option>
                WALKING
              </option>

              <option>
                CYCLING
              </option>

              <option>
                SWIMMING
              </option>

              <option>
                WEIGHT_TRAINING
              </option>

              <option>
                YOGA
              </option>

              <option>
                HIIT
              </option>
            </select>

            <input
              type="number"
              name="duration"
              placeholder="Duration (mins)"
              value={
                formData.duration
              }
              onChange={
                handleChange
              }
              className="
              p-3
              rounded-xl
              border
              border-violet-200
              "
            />

            <input
              type="number"
              name="caloriesBurned"
              placeholder="Calories Burned"
              value={
                formData.caloriesBurned
              }
              onChange={
                handleChange
              }
              className="
              p-3
              rounded-xl
              border
              border-violet-200
              "
            />

            <button
              disabled={
                loading
              }
              className="
              md:col-span-3
              bg-[#23084D]
              hover:bg-[#3B1175]
              text-white
              py-3
              rounded-xl
              "
            >
              {loading
                ? "Adding..."
                : "Add Activity"}
            </button>
          </form>
        </motion.div>

        {/* HISTORY */}

        <div className="mt-10">
          <h2
            className="
            text-2xl
            font-semibold
            text-[#23084D]
            mb-4
            "
          >
            Activity History
          </h2>

          <div
            className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-5
            "
          >
            {activities.map(
              (
                activity
              ) => (
                <motion.div
                  key={
                    activity.id
                  }
                  whileHover={{
                    y: -5,
                  }}
                  className="
                  bg-white
                  rounded-3xl
                  p-5
                  shadow-lg
                  "
                >
                  <div
                    className="
                    flex
                    justify-between
                    items-center
                    "
                  >
                    <div
                      className="
                      text-3xl
                      text-[#23084D]
                      "
                    >
                      {getIcon(
                        activity.type
                      )}
                    </div>

                    <span
                      className="
                      bg-violet-100
                      text-[#23084D]
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      "
                    >
                      {
                        activity.type
                      }
                    </span>
                  </div>

                  <div className="mt-5">
                    <p
                      className="
                      text-gray-500
                      "
                    >
                      Duration
                    </p>

                    <h3
                      className="
                      text-xl
                      font-bold
                      "
                    >
                      {
                        activity.duration
                      }{" "}
                      mins
                    </h3>
                  </div>

                  <div className="mt-4">
                    <p
                      className="
                      text-gray-500
                      "
                    >
                      Calories
                    </p>

                    <h3
                      className="
                      text-xl
                      font-bold
                      text-orange-500
                      "
                    >
                      {
                        activity.caloriesBurned
                      }{" "}
                      kcal
                    </h3>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </motion.div>
    </div>
    </AppLayout>
  );
};

export default ActivitiesPage;