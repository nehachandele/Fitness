import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  toast,
} from "react-toastify";

import AppLayout from "../components/layout/AppLayout";

import GoalCard from "../components/goals/GoalCard";

import {
  createGoal,
  getGoals,
} from "../services/goalService";

import {
  getUser,
} from "../utils/auth";

const GoalsPage = () => {

  const user = getUser();

  const [goals, setGoals] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      goalType:
        "DAILY_CALORIES",
      targetValue: "",
    });

  const loadGoals =
    async () => {

      try {

        const data =
          await getGoals();

        setGoals(data);

      } catch (err) {

        console.log(err);

      }

    };

  useEffect(() => {

    loadGoals();

  }, []);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        !formData.targetValue
      ) {

        toast.error(
          "Target required"
        );

        return;

      }

      try {

        setLoading(true);

        await createGoal({
          userId: user.id,
          goalType:
            formData.goalType,
          targetValue:
            Number(
              formData.targetValue
            ),
        });

        toast.success(
          "Goal Created"
        );

        setFormData({
          goalType:
            "DAILY_CALORIES",
          targetValue: "",
        });

        loadGoals();

      } catch {

        toast.error(
          "Failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <AppLayout>

      <div className="space-y-8">

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
          bg-gradient-to-r
          from-[#23084D]
          via-[#4C1D95]
          to-[#8B5CF6]
          rounded-3xl
          p-8
          text-white
          "
        >

          <h1
            className="
            text-4xl
            font-bold
            "
          >
            Goals
          </h1>

          <p className="mt-2 opacity-90">
            Track your fitness targets
          </p>

        </motion.div>

        <div
          className="
          bg-white
          p-6
          rounded-3xl
          shadow-lg
          "
        >

          <h2
            className="
            text-xl
            font-bold
            text-[#23084D]
            "
          >
            Create Goal
          </h2>

          <form
            onSubmit={
              handleSubmit
            }
            className="
            mt-5
            grid
            md:grid-cols-3
            gap-4
            "
          >

            <select
              value={
                formData.goalType
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  goalType:
                    e.target.value,
                })
              }
              className="
              p-3
              border
              rounded-xl
              "
            >

              <option value="DAILY_CALORIES">
                Daily Calories
              </option>

              <option value="WEEKLY_ACTIVITIES">
                Weekly Activities
              </option>

              <option value="DAILY_DURATION">
                Daily Duration
              </option>

              <option value="MONTHLY_CALORIES">
                Monthly Calories
              </option>

            </select>

            <input
              type="number"
              placeholder="Target"
              value={
                formData.targetValue
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  targetValue:
                    e.target.value,
                })
              }
              className="
              p-3
              border
              rounded-xl
              "
            />

            <button
              disabled={
                loading
              }
              className="
              bg-[#23084D]
              text-white
              rounded-xl
              "
            >
              Create
            </button>

          </form>

        </div>

        <div
          className="
          grid
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
          "
        >

          {goals.map(
            (goal) => (

              <GoalCard
                key={goal.id}
                goal={goal}
              />

            )
          )}

        </div>

      </div>

    </AppLayout>

  );
};

export default GoalsPage;