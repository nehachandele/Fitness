const GoalProgress = ({
  current,
  goal,
  percentage,
}) => {

  return (
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
        "
      >
        Weekly Goal
      </h2>

      <div className="mt-5">

        <div
          className="
          flex
          justify-between
          mb-2
          "
        >
          <span>
            {current} Calories
          </span>

          <span>
            {goal}
          </span>
        </div>

        <div
          className="
          h-4
          bg-violet-100
          rounded-full
          overflow-hidden
          "
        >
          <div
            className="
            h-full
            bg-gradient-to-r
            from-[#23084D]
            via-[#7C3AED]
            to-[#EC4899]
            transition-all
            duration-1000
            "
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <p
          className="
          mt-3
          text-center
          font-semibold
          text-[#23084D]
          "
        >
          {percentage}% Complete
        </p>

      </div>
    </div>
  );
};

export default GoalProgress;