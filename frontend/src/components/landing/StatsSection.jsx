const StatsSection = () => {
  const stats = [
    { value: "10K+", label: "Users" },
    { value: "50K+", label: "Activities" },
    { value: "100+", label: "Workouts" },
    { value: "4.9", label: "Rating" },
  ];

  return (
    <section className="py-16">

      <div className="max-w-7xl mx-auto px-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 text-center"
            >
              <h2 className="text-4xl font-bold text-purple-600">
                {item.value}
              </h2>

              <p>{item.label}</p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default StatsSection;