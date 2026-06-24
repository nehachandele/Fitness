const HeroSection = () => {
  return (
    <section
      className="
      bg-gradient-to-br
      from-white
      via-[#F8F5FF]
      to-[#EDE9FE]
      py-16
      lg:py-24
    "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-5
        lg:px-8
      "
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>

            <span
              className="
              bg-[#EDE9FE]
              text-[#23084D]
              px-4
              py-2
              rounded-full
              text-sm
              font-semibold
            "
            >
              AI Powered Fitness Tracking
            </span>

            <h1
              className="
              text-4xl
              sm:text-5xl
              lg:text-7xl
              font-bold
              mt-6
              leading-tight
            "
            >
              Build
              <span className="text-[#23084D]">
                {" "}Healthier Habits
              </span>

              <br />

              Track Every Step
            </h1>

            <p
              className="
              mt-6
              text-gray-600
              text-base
              sm:text-lg
            "
            >
              Track workouts, calories,
              goals and AI recommendations
              with real-time progress analytics.
            </p>

            <div className="flex gap-4 mt-8 flex-wrap">

              <button
                className="
                bg-[#23084D]
                hover:bg-[#3B1175]
                text-white
                px-6
                py-3
                rounded-2xl
                transition
              "
              >
                Start Journey
              </button>

              <button
                className="
                bg-white
                border
                border-[#23084D]
                text-[#23084D]
                px-6
                py-3
                rounded-2xl
              "
              >
                Explore Features
              </button>

            </div>
          </div>

          <div>

            <div
              className="
              bg-white
              rounded-3xl
              p-4
              shadow-xl
            "
            >
              <img
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
                alt="fitness"
                className="rounded-2xl"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;