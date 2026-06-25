const GoalProgressBar = ({
  current,
  target,
}) => {

  const percentage =
    Math.min(
      Math.round(
        (current / target) * 100
      ),
      100
    );

  return (
    <div>

      <div
        className="
        flex
        justify-between
        mb-2
        text-sm
        "
      >
        <span>
          {current}/{target}
        </span>

        <span>
          {percentage}%
        </span>
      </div>

      <div
        className="
        h-3
        bg-violet-100
        rounded-full
        overflow-hidden
        "
      >
        <div
          style={{
            width: `${percentage}%`,
          }}
          className="
          h-full
          bg-gradient-to-r
          from-[#23084D]
          via-[#8B5CF6]
          to-[#EC4899]
          transition-all
          duration-700
          "
        />
      </div>

    </div>
  );
};

export default GoalProgressBar;