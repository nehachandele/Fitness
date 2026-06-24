const HeroSection = () => {
  return (
    <section className="py-24">

      <div className="max-w-7xl mx-auto px-8">

        <div className="grid md:grid-cols-2 gap-12">

          <div>

            <h1 className="text-6xl font-bold leading-tight">
              Track Your Fitness
              <span className="text-purple-600 block">
                Transform Your Life
              </span>
            </h1>

            <p className="mt-8 text-gray-600 text-lg">
              Monitor activities, calories,
              progress and AI recommendations.
            </p>

            <div className="mt-10 flex gap-4">

              <button className="bg-purple-600 text-white px-6 py-3 rounded-xl">
                Start Journey
              </button>

              <button className="border px-6 py-3 rounded-xl">
                Learn More
              </button>

            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
              alt="fitness"
              className="rounded-3xl"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;