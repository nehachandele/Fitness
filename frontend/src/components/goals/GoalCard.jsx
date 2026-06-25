import { motion } from "framer-motion";
import GoalProgressBar from "./GoalProgressBar";
import { FaBullseye } from "react-icons/fa";

const GoalCard = ({
  goal,
}) => {

  return (
    <motion.div
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

        <div>

          <h3
            className="
            font-bold
            text-[#23084D]
            "
          >
            {goal.goalType.replace(
              "_",
              " "
            )}
          </h3>

          <p
            className="
            text-sm
            text-gray-500
            "
          >
            Target:
            {goal.targetValue}
          </p>

        </div>

        <FaBullseye
          className="
          text-2xl
          text-[#EC4899]
          "
        />

      </div>

      <div className="mt-5">

        <GoalProgressBar
          current={
            goal.currentValue
          }
          target={
            goal.targetValue
          }
        />

      </div>

      <div className="mt-4">

        <span
          className={`
          px-3
          py-1
          rounded-full
          text-xs
          font-semibold

          ${
            goal.status ===
            "COMPLETED"
              ? "bg-green-100 text-green-700"
              : "bg-violet-100 text-[#23084D]"
          }
          `}
        >
          {goal.status}
        </span>

      </div>

    </motion.div>
  );
};

export default GoalCard;